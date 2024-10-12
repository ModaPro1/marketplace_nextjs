"use server";

import { createAuthSession, getSession } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { formatZodError, hashUserPassword, verifyPassword } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function userSignupWithEmail(state: any, formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: any = {};

  const userSchema = z.object({
    username: z.string().min(1, { message: "Username field is required" }),
    email: z.string().min(1, { message: "Email field is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password field is required" }),
  });
  const result = userSchema.safeParse({ username, email, password });
  if (!result.success) {
    let formattedErrors = formatZodError(result.error.format());
    errors = formattedErrors;
  }

  const existingUserEmail = await prisma.user.findUnique({ where: { email: email } });
  const existingMerchantEmail = await prisma.merchant.findUnique({ where: { email: email } });

  if (existingUserEmail || existingMerchantEmail) {
    errors.email = "Email already exists";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors, success: false };
  }

  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashUserPassword(password),
    },
  });

  await createAuthSession(user.id, "user");
  return redirect("/");
}

export async function userLoginWithEmail(sate: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  let errors: any = {};

  if (!email) {
    errors.email = "Email field is required";
  }

  if (!password) {
    errors.password = "Password field is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors, success: false };
  }

  const user = await prisma.user.findUnique({ where: { email: email } });
  const merchant = await prisma.merchant.findUnique({ where: { email: email } });
  if (user && verifyPassword(user.password, password)) {
    await createAuthSession(user.id, "user");
    return redirect("/");
  } else if (merchant && verifyPassword(merchant.password, password)) {
    await createAuthSession(merchant.id, "merchant");
    return redirect("/merchant_dashboard");
  } else {
    return { errors: { email: "Credentials are invalid" }, success: false };
  }
}

export async function merchantSignup(state: any, formData: FormData) {
  const store_name = formData.get("store_name") as string;
  const store_image = formData.get("store_image") as File;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: any = {};

  const fileSchema = z.instanceof(File).refine((file) => file.size > 0, { message: "Store image is required" });
  const storeSchema = z.object({
    store_name: z.string().min(1, { message: "Store Name field is required" }),
    store_image: fileSchema,
    email: z.string().min(1, { message: "Email field is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password field is required" }),
  });
  const result = storeSchema.safeParse({ store_name, store_image, email, password });
  if (!result.success) {
    let formattedErrors = formatZodError(result.error.format());
    errors = formattedErrors;
  }

  const existingUserEmail = await prisma.user.findUnique({ where: { email: email } });
  const existingMerchantEmail = await prisma.merchant.findUnique({ where: { email: email } });
  if (existingUserEmail || existingMerchantEmail) {
    errors.email = "Email already exists";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors, success: false };
  }

  const imageUploadUrl = await uploadImage(store_image);

  const user = await prisma.merchant.create({
    data: {
      store_name: store_name,
      store_image: imageUploadUrl,
      email,
      password: hashUserPassword(password),
    },
  });

  await createAuthSession(user.id, "merchant");
  return redirect("/");
}

export async function signout() {
  const session = await getSession();
  session.destroy();
  return redirect("/login");
}
