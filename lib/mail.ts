import nodemailer from "nodemailer";
import { orderSuccessTemplate } from "./email_templates/order_success";

const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export async function sendPaymentSuccessMail(
  to: string,
  username: string,
  orderedProducts: { image: string; name: string; description: string; quantity: number; price: number }[],
  totalPrice: number,
  shippingPrice: number,
  orderId: string
) {
  try {
    const template = orderSuccessTemplate(username, orderedProducts, totalPrice, shippingPrice, orderId)

    await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject: "Order Success",
      html: template,
    });

  } catch (error) {
    console.log("Error at sending email", error);
  }
}

export async function sendContactEmail() {

}