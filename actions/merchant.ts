"use server";

import { getSession } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { merchantSchema, productSchema, productSchemaWithoutImage } from "@/lib/validationSchemas";
import { redirect } from "next/navigation";
import { cache } from "react";

type NotificationType = "ACCOUNT_ACTIVATION" | "NEW_ORDER" | "OTHER";

export async function addProduct(formData: FormData) {
  const session = await getSession();

  const images: File[] = [];
  formData.forEach((value, key) => {
    if (key.startsWith("image")) {
      images.push(value as File);
    }
  });

  const productData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    return_policy: formData.get("return_policy") as string,
    shipping_info: formData.get("shipping_info") as string,
    price: Number(formData.get("price")),
    shipping_price: Number(formData.get("shipping_price")),
    category: formData.get("category") as string,
    images: images,
    options: JSON.parse(formData.get("options") as string),
  };

  productSchema.parse(productData);

  // checking for category in the db
  const category = await prisma.category.findUnique({ where: { name: productData.category } });
  if (!category) {
    return { success: false, id: "category", message: "Category id does not exist" };
  }

  // images upload
  let imagesNames: string[] = [];
  await Promise.all(
    images.map(async (image) => {
      const imageName = await uploadImage(image);
      imagesNames.push(imageName);
    })
  );

  await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      categoryId: category!.id,
      images_list: imagesNames,
      merchantId: session.userId,
      description: productData.description,
      return_policy_text: productData.return_policy,
      shipping_info_text: productData.shipping_info,
      shipping_price: productData.shipping_price || 0,
      options: { create: productData.options },
    },
  });
  redirect("/merchant_dashboard");
}

export async function editProduct(formData: FormData, id: string) {
  const session = await getSession();
  const originalProduct = await prisma.product.findUnique({ where: { id } });
  if (!originalProduct) {
    return;
  }

  const productData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    return_policy: formData.get("return_policy") as string,
    shipping_info: formData.get("shipping_info") as string,
    price: Number(formData.get("price")),
    shipping_price: Number(formData.get("shipping_price")),
    category: formData.get("category") as string,
    options: JSON.parse(formData.get("options") as string),
  };

  productSchemaWithoutImage.parse(productData);

  // checking for category in the db
  const category = await prisma.category.findUnique({ where: { name: productData.category } });
  if (!category) {
    return { success: false, id: "category", message: "Category id does not exist" };
  }

  // deleting all current options
  await prisma.productOption.deleteMany({
    where: {
      productId: id,
    },
  });

  await prisma.product.update({
    where: { id: id },
    data: {
      name: productData.name,
      price: productData.price,
      categoryId: category!.id,
      merchantId: session.userId,
      description: productData.description,
      return_policy_text: productData.return_policy,
      shipping_info_text: productData.shipping_info,
      shipping_price: productData.shipping_price || 0,
      options: { create: productData.options },
    },
  });

  redirect("/merchant_dashboard");
}

export async function merchantDeleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id: id } });
}

export const getOrders = cache(async () => {
  const session = await getSession();
  const orders = await prisma.order.findMany({
    where: {
      status: { not: "pending" },
      products: {
        some: {
          product: {
            merchantId: session.userId,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      address: true,
      products: {
        include: {
          product: true,
          option: true,
        },
      },
    },
  });

  return orders;
});

export const markNotificationsAsRead = async () => {
  const session = await getSession();
  await prisma.merchantNotification.updateMany({ where: { merchantId: session.userId }, data: { isRead: true } });
};

export const sendMerchantNotification = async (merchantId: string, message: string, type: NotificationType) => {
  await prisma.merchantNotification.create({
    data: {
      merchantId,
      message,
      type,
    },
  });
};

export async function deleteOrder(id: string) {
  const session = await getSession();

  if (session.userType != "merchant") {
    return;
  }

  await prisma.order.delete({ where: { id } });
}

export async function getMerchantNotifications() {
  const session = await getSession();
  const notifications = await prisma.merchantNotification.findMany({
    where: { merchantId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return notifications;
}

export async function editProfile(formData: FormData, merchantId: string) {
  const data = {
    store_name: formData.get("store_name") as string,
    store_image: formData.get("store_image") as File,
    email: formData.get("email") as string,
  };
  merchantSchema.parse(data);
  const merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
  if (!merchant) {
    return {success: false};
  }

  if (data.email != merchant.email) {
    // edit email
    const existingUserEmail = await prisma.user.findUnique({ where: { email: data.email } });
    const existingMerchantEmail = await prisma.merchant.findUnique({ where: { email: data.email } });

    if (existingUserEmail || existingMerchantEmail) {
      return { success: false, type: "email_taken", message: "Email is already taken." };
    }

    await prisma.merchant.update({ where: { id: merchantId }, data: { email: data.email } });
  }

  if(data.store_image) {
    // edit image
    const imageurl = await uploadImage(data.store_image)
    await prisma.merchant.update({ where: { id: merchantId }, data: { store_image: imageurl } });
  }

  // edit name
  await prisma.merchant.update({ where: { id: merchantId }, data: { store_name: data.store_name } })

  return { success: true };
}
