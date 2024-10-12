// import { sendMerchantNotification } from "@/actions/merchant";
// import { sendPaymentSuccessMail } from "@/lib/mail";
// import { prisma } from "@/lib/prisma";
// import { Cart, Product, ProductOption } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export async function GET(req: NextRequest) {
  
//   try {
//     // Extract session_id from query parameters
//     const { searchParams } = new URL(req.url);
//     const sessionId = searchParams.get("session_id");

//     if (!sessionId) {
//       return NextResponse.json({ error: "session_id is required" }, { status: 400 });
//     }

//     // Retrieve the session from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     // Update order status
//     const order = await prisma.order.update({
//       where: { sessionId: session.id },
//       data: { status: session.status == "complete" ? "success" : "failed" },
//     });

//     if (session.status == "complete") {
//       // Delete cart content
//       await prisma.cart.deleteMany({ where: { userId: order.userId } });
      
//       if (!order.seen) {
//         // update order seen
//         const orderUpdated = await prisma.order.update({
//           where: { sessionId: session.id },
//           data: { seen: true },
//           select: { user: true, products: { select: { product: true, price: true, quantity: true, option: true } } },
//         });

//         // send email
//         const orderedProducts = orderUpdated.products.map((order) => {
//           return {
//             name: order.product.name,
//             image: order.product.images_list[0],
//             description: order.option ? order.option.name : "",
//             price: order.price + (order.option ? order.option.price : 0),
//             quantity: order.quantity,
//           };
//         });

//         await sendPaymentSuccessMail(
//           orderUpdated.user.email,
//           orderUpdated.user.name,
//           orderedProducts,
//           order.totalPrice / 100,
//           order.shippingPrice / 100,
//           order.id
//         );

//         // send merchant notification
//         await sendMerchantNotification(
//           orderUpdated.products[0].product.merchantId,
//           "You have new order, check it out from your orders page.",
//           "NEW_ORDER"
//         );
//       }
//     }

//     return NextResponse.json({
//       status: session.status,
//       orderId: order.id,
//     });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
//   }
// }

// // POST request to create a checkout session
// export async function POST(req: NextRequest) {
//   try {
//     const requestData = await req.json();
//     const userData = requestData.userData;
//     if (!userData) {
//       return;
//     }
//     const user = await prisma.user.findUnique({
//       where: { id: userData.id, email: userData.email },
//       include: { cart: { include: { option: true, product: true } } },
//     });
//     if (!user || user.cart.length == 0) {
//       return;
//     }
//     const origin = req.headers.get("origin") || new URL(req.url).origin;
//     const checkoutLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = user.cart.map((item) => {
//       const itemOption = item.option;
//       const unitPrice = item.product.price + (itemOption ? itemOption.price : 0);

//       return {
//         quantity: item.quantity,
//         price_data: {
//           currency: "usd",
//           unit_amount: Math.ceil(unitPrice * 100),
//           product_data: {
//             name: item.product.name,
//             description: itemOption ? itemOption.name : "No option selected",
//             images: item.product.images_list,
//           },
//         },
//       };
//     });

//     const uniqueProductIds = new Set(user.cart.map((item) => item.product.id));
//     const totalShipping = Array.from(uniqueProductIds).reduce((acc, productId) => {
//       const product = user.cart.find((item) => item.product.id === productId);
//       return acc + (product?.product.shipping_price || 0);
//     }, 0);

//     // Create a checkout session
//     const session = await stripe.checkout.sessions.create({
//       ui_mode: "embedded",
//       customer_email: userData.customer_details.email,
//       line_items: checkoutLineItems,
//       mode: "payment",
//       return_url: `${origin}/payment_return?session_id={CHECKOUT_SESSION_ID}`,
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: totalShipping * 100,
//               currency: "usd",
//             },
//             display_name: "Products shipping",
//           },
//         },
//       ],
//     });

//     // creating order in the db
//     const order = await prisma.order.create({
//       data: {
//         email: userData.customer_details.email,
//         name: userData.customer_details.name,
//         phone: userData.customer_details.phone,
//         address: {
//           connect: { id: userData.customer_details.selected_shipping_info.id },
//         },
//         user: {
//           connect: { id: userData.id, email: userData.email },
//         },
//         sessionId: session.id,
//         totalPrice: session.amount_total as number,
//         shippingPrice: session.shipping_cost ? session.shipping_cost.amount_total : 0,
//         status: "pending",
//       },
//     });

//     // creating order products in db
//     await Promise.all(
//       userData.cart.map(async (item: Cart & { product: Product; option: ProductOption }) => {
//         return prisma.orderProduct.create({
//           data: {
//             productId: item.product.id,
//             orderId: order.id,
//             price: item.product.price,
//             quantity: item.quantity,
//             optionId: item.option?.id,
//           },
//         });
//       })
//     );

//     return Response.json({ clientSecret: session.client_secret });
//   } catch (err: any) {
//     return Response.json({ error: err.message }, { status: err.statusCode || 500 });
//   }
// }
