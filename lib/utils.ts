import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "node:crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashUserPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hashedPassword = crypto.scryptSync(password, salt, 64);
  return hashedPassword.toString("hex") + ":" + salt;
}

export function verifyPassword(storedPassword: string, suppliedPassword: string) {
  const [hashedPassword, salt] = storedPassword.split(":");
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}

export function formatZodError(formattedErrors: Record<string, any>): Record<string, string> {
  let errors: Record<string, string> = {};
  for (const [key, value] of Object.entries(formattedErrors)) {
    errors[key] = value._errors?.[0] || "Invalid input";
  }
  return errors;
}
