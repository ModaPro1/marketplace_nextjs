import DashboardSpinner from "@/components/Merchant/DashboardSpinner";
import { getSession } from "@/lib/auth";
import { ReactNode, Suspense } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsCart2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import OrdersTable from "@/components/Merchant/OrdersTable";

function InfoBox(props: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-sm border bg-white px-7 py-6 shadow">
      <div className="w-10 h-10 flex justify-center items-center text-main bg-main bg-opacity-20 text-lg rounded-full">
        {props.icon}
      </div>
      <h6 className="mt-4 text-xl font-semibold">{props.title}</h6>
      <span className="text-gray-600 text-xs block">{props.description}</span>
    </div>
  );
}

async function PageContent() {
  const session = await getSession();
  const merchantId = session.userId;

  const productsCount = await prisma.product.count({ where: { merchantId } });
  const likesCount = await prisma.productLike.count({ where: { product: { merchantId } } });
  const orders = await prisma.order.findMany({ where: { status: "success", products: { some: { product: { merchantId } } } }, orderBy: {createdAt: "desc"} });
  const ordersProfitArr = orders.map((order) => order.totalPrice - order.shippingPrice);
  let totalProfit = 0;
  if (ordersProfitArr.length > 0) {
    totalProfit = ordersProfitArr.reduce((prev, curr) => prev + curr);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <InfoBox icon={<MdAttachMoney />} title={`$${totalProfit / 100}`} description="Total Profit" />
        <InfoBox
          icon={<HiOutlineShoppingBag />}
          title={`${productsCount} ${productsCount == 1 ? "Product" : "Products"}`}
          description="Products Count"
        />
        <InfoBox
          icon={<BsCart2 />}
          title={`${orders.length} ${orders.length == 1 ? "Order" : "Orders"}`}
          description="Total Orders"
        />
        <InfoBox
          icon={<FaRegHeart />}
          title={`${likesCount} ${likesCount == 1 ? "Like" : "Likes"}`}
          description="Total Store Likes"
        />
      </div>
      <div className="mt-4 md:mt-6 border bg-white shadow">
        <h3 className="px-6 py-3 font-semibold text-lg">Latest orders</h3>
        <OrdersTable orders={orders} max={5} />
        <Link
          href="/merchant_dashboard/orders"
          className="mx-6 my-3 block w-fit bg-main text-white px-2 py-1 rounded-sm text-sm"
        >
          View all orders
        </Link>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <Suspense fallback={<DashboardSpinner />}>
        <PageContent />
      </Suspense>
    </div>
  );
}
