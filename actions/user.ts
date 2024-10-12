"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatZodError } from "@/lib/utils";
import { Cart, Product, ProductOption } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { z } from "zod";

export type CartWithProduct = Cart & {
  product: Product;
  option: ProductOption;
};

export const addProductToCart = async (productId: string, quantity: number, optionId?: string): Promise<{success: boolean, message?: string, id?: string}> => {
  const session = await getSession();
  if (!session.isLoggedIn || session.userType !== "user") {
    return { success: false, message: "Please login as a user first" };
  }
  
  const cartItem = await prisma.cart.create({
    data: {
      quantity: quantity,
      userId: session.userId,
      productId,
      ...(optionId && { optionId }),
    },
  });
  
  return { success: true, id: cartItem.id};
}

export async function removeCartItem(id: string) {
  const session = await getSession();
  if (!session.isLoggedIn || session.userType !== "user") {
    return;
  }

  await prisma.cart.delete({ where: { id: id } });
}

export const getUserCart = cache(async () => {
  const session = await getSession();
  if (!session.isLoggedIn || session.userType !== "user") {
    return;
  }
  const cart = await prisma.cart.findMany({
    where: { userId: session.userId },
    include: { product: true, option: true },
    orderBy: [{ createdAt: "asc" }],
  });
  return cart as CartWithProduct[];
});

export async function updateItemQuantity(id: string, newQty: number) {
  const session = await getSession();
  if (!session.isLoggedIn || session.userType !== "user") {
    return;
  }

  await prisma.cart.update({ where: { id: id }, data: { quantity: newQty } });
}

export async function editUserProfile(data: { name: string; email: string }) {
  const session = await getSession();
  const newUserData = {
    name: data.name,
    email: data.email,
  };

  const schema = z.object({
    name: z.string().min(1, "Name field is required"),
    email: z.string().email("Email is not valid").min(1, "Email field is required"),
  });
  let errors: z.infer<typeof schema> = { name: "", email: "" };

  const result = schema.safeParse(newUserData);
  if (!result.success) {
    const formattedErrors = result.error.format();
    errors.name = formatZodError(formattedErrors).name;
    errors.email = formatZodError(formattedErrors).email;
    return errors;
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    return;
  }

  if (user.email !== newUserData.email) {
    // update the email
    const existingEmail = await prisma.user.findUnique({ where: { email: newUserData.email } });
    if (existingEmail) {
      errors.email = "Email already exists.";
      return errors;
    } else {
      await prisma.user.update({ where: { id: session.userId }, data: { email: newUserData.email } });
    }
  }

  if (user.name != newUserData.name) {
    await prisma.user.update({ where: { id: session.userId }, data: { name: newUserData.name } });
  }
}

export async function addUserAddress(data: { country: string; address: string }) {
  if (!data.country || !data.address) {
    return;
  }
  const session = await getSession();
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    return;
  }

  const address = await prisma.shippingInfo.create({
    data: {
      address: data.address,
      country: data.country,
      userId: user.id,
    },
  });

  return address;
}

export async function deleteUserAddress(addressId: string) {
  const session = await getSession();
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    return;
  }

  await prisma.shippingInfo.delete({ where: { userId: session.userId, id: addressId } });
}

export const getUserOrders = cache(async (id?: string) => {
  const session = await getSession();
  const orders = await prisma.order.findMany({
    where: {
      userId: session.userId,
      status: { not: "pending" },
      ...(id && { id }),
    },
    include: { products: { include: { product: true, option: true } }, address: true },
    orderBy: { createdAt: "desc" },
  });

  return orders;
});

export async function likeProduct(productId: string) {
  const session = await getSession();
  if (session.userType != "user") {
    return;
  }

  const existingLike = await prisma.productLike.findFirst({
    where: { productId, userId: session.userId },
  });

  if (existingLike) {
    // delete like
    await prisma.productLike.delete({
      where: { id: existingLike.id },
    });
  } else {
    // add like
    await prisma.productLike.create({
      data: {
        productId,
        userId: session.userId,
      },
    });
  }

  revalidatePath(`/products/${productId}`);
}
