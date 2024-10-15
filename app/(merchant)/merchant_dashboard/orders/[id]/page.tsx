import BreadCrumb from "@/components/Merchant/BreadCrumb";
import DashboardSpinner from "@/components/Merchant/DashboardSpinner";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function PageContent({ id }: { id: string }) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { address: true, products: { select: { product: true, option: true, price: true, quantity: true } } },
  });
  if (!order) {
    notFound();
  }

  return (
    <div className="border shadow rounded-sm bg-white p-6">
      <div className="mb-1">Order From:</div>
      <h4 className="text-xl font-medium mb-3">{order.name}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 sm:max-w-fit">
        <div>
          <span className="font-medium">Email:</span>
          <span className="text-gray-500 ms-1">{order.email}</span>
        </div>
        <div>
          <span className="font-medium">Date:</span>
          <span className="text-gray-500 ms-1">{new Date(order.createdAt).toDateString()}</span>
        </div>
        <div>
          <span className="font-medium">Address:</span>
          <span className="text-gray-500 ms-1">
            {order.address.country} - {order.address.address}
          </span>
        </div>
      </div>
      <div className="mt-5 border p-5 rounded-sm relative overflow-x-auto divide-y">
        {order.products.map((product, index) => {
          return (
            <div key={index} className="flex flex-col sm:flex-row gap-2 whitespace-nowrap py-2 first:pt-0 last:pb-0 ">
              <Image
                src={product.product.images_list[0]}
                alt="Product's image"
                className="me-5 w-24 h-20"
                width={100}
                height={100}
              />
              <div className="flex flex-col md:flex-row justify-between md:items-center flex-1">
                <div>
                  <Link href={`/merchant_dashboard/products/edit/${product.product.id}`} className="hover:text-main">
                    {product.product.name}
                  </Link>
                  <span className="block text-sm text-gray-500">Option: {product.option?.name || "N/A"}</span>
                </div>
                <div className="flex gap-4 sm:gap-9 items-center me-5 md:w-32">
                  <div>Qty: {product.quantity}</div>
                  <div>${product.price + (product.option?.price || 0)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 w-full sm:w-80 ms-auto">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${(order.totalPrice - order.shippingPrice) / 100}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span>Shipping Cost</span>
          <span>${order.shippingPrice / 100}</span>
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t">
          <span>Total Paid</span>
          <span>${order.totalPrice / 100}</span>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <>
      <BreadCrumb history={[{ link: "/orders", title: "Orders" }]} current="View order" classes="mb-5" />
      <Suspense fallback={<DashboardSpinner />}>
        <PageContent id={params.id} />
      </Suspense>
    </>
  );
}
