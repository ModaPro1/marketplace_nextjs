import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const productSchema = z.object({
  name: z.string().min(1, "Name field is required"),
  price: z.number().min(1, "Product price must be greater than 0"),
  shipping_price: z.number().min(1, "Shipping price must be greater than or equal to 0"),
  category: z.string().min(1, "Category is required"),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(4, "You can only upload up to 4 images"),
  options: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
    })
  ),
  description: z.string().min(1, "Product description is required"),
  return_policy: z.string().min(1, "Return policy is required"),
  shipping_info: z.string().min(1, "Shipping info is required"),
});

export const productSchemaWithoutImage = z.object({
  name: z.string().min(1, "Name field is required"),
  price: z.number().min(1, "Product price must be greater than 0"),
  shipping_price: z.number().min(1, "Shipping price must be greater than or equal to 0"),
  category: z.string().min(1, "Category is required"),
  options: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
    })
  ),
  description: z.string().min(1, "Product description is required"),
  return_policy: z.string().min(1, "Return policy is required"),
  shipping_info: z.string().min(1, "Shipping info is required"),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name field is required"),
  email: z.string().email("Email field is required"),
  message: z.string().min(1, "Message field is required").max(300, "Message must be less than 300 characters"),
});

export const merchantSchema = z.object({
  store_name: z.string().min(1, "Store name is required"),
  store_image: z
    .any()
    .optional()
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  email: z.string().email("Invalid email address"),
});
