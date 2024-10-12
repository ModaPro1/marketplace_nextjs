import { getUserOrders } from "@/actions/user";
import OrderProductSkeleton from "@/components/ui/skeleton/OrderProducts";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";

async function PageContent({ searchParams }: { searchParams: { id: string } }) {
  const { id } = searchParams;

  const orders = await getUserOrders(id)

  if (!orders || orders.length === 0) {
    return <p className="mt-5 text-center font-medium text-lg">No orders found.</p>;
  }

  return orders.map((order) => (
    <div key={order.id} className="space-y-3">
      {order.products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between pb-1.5 mb-1.5 border-b border-b-gray-300 flex-wrap">
            <h2 className="font-medium">{order.status === "success" ? "Success order" : "Failed order"}</h2>
            <div className="text-xs sm:text-sm flex items-center">
              <span className="text-gray-600 pe-2 me-2 border-e border-e-gray-300">
                Order date: {new Date(order.createdAt).toDateString()}
              </span>
              <Link
                className="flex items-center gap-1 font-medium transition hover:text-main"
                href={`/orders/${order.id}`}
              >
                More details
                <LiaAngleRightSolid className="inline" />
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            <Image src={product.product.images_list[0]} alt="Product Image" className="h-20 w-24 object-cover" width={100} height={100} />
            <div>
              <Link href={`/products/${product.product.id}`} className="font-medium hover:underline">{product.product.name}</Link>
              {product.option && (<p className="text-sm text-gray-600">{product.option.name}</p>)}
              <p className="text-sm flex gap-2 mt-3">
                <span>${product.price + (product.option?.price || 0)}</span>
                <span className="text-gray-500">x{product.quantity}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ));
}

export default function UserOrdersPage({ searchParams }: { searchParams: { id: string } }) {
  return (
    <div className="mt-5 space-y-3">
      <Suspense fallback={<OrderProductSkeleton />}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
