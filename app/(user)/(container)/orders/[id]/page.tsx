import { getUserOrders } from "@/actions/user";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SlLocationPin } from "react-icons/sl";

async function PageContent({ id }: { id: string }) {
  let order = await getUserOrders(id);

  if (!order || order.length == 0) {
    return notFound();
  }

  return (
    <>
      <div className="mt-5 flex gap-2">
        <div className="bg-white p-4 rounded-md shadow flex-1">
          {order[0].status == "success" ? (
            <h2 className="font-medium text-lg flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              Success order
            </h2>
          ) : (
            <h2 className="font-medium text-lg flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-red-700"></div>
              Failed order
            </h2>
          )}
          <p className="text-gray-600 mt-2">
            {order[0].status == "success"
              ? "This order was successfully placed"
              : "This order was not successfully placed due to a problem, please contact us for further informations"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-md shadow flex-1 flex gap-3">
          <SlLocationPin fontSize={20} />
          <div className="text-gray-700 -top-1 relative">
            <div>{order[0].name}</div>
            <div>{order[0].phone}</div>
            <div>
              {order[0].address.country} - {order[0].address.address}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md shadow mt-2">
        <h2 className="pb-2.5 mb-2.5 border-b font-medium text-lg">Ordered products</h2>
        <div className="space-y-2">
          {order[0].products.map((product) => {
            return (
              <div className="flex gap-3 items-start" key={product.id}>
                <Image src={product.product.images_list[0]} alt="Product Image" width={80} height={80} className="h-20" />
                <div>
                  <Link href={`/products/${product.product.id}`} className="hover:underline">
                    {product.product.name}
                  </Link>
                  {product.option && <p className="text-gray-600 text-sm">{product.option.name}</p>}
                  <p className="text-sm flex gap-2 mt-3">
                    <span>${product.price + (product.option?.price || 0)}</span>
                    <span className="text-gray-500">x{product.quantity}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<h3 className="mt-10 text-center text-xl">Loading your order...</h3>}>
      <PageContent id={params.id} />
    </Suspense>
  );
}
