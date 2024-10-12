import { getOrders } from "@/actions/merchant";
import DashboardSpinner from "@/components/Merchant/DashboardSpinner";
import { Suspense } from "react";
import BreadCrumb from "@/components/Merchant/BreadCrumb";
import OrdersTable from "@/components/Merchant/OrdersTable";

async function PageContent() {
  const orders = await getOrders();

  if (orders.length > 0) {
    return <OrdersTable orders={orders} addBtns={true} />;
  } else {
    return <h1 className="font-semibold text-xl text-slate-700 text-center mt-10">You have no orders yet.</h1>;
  }
}

export default async function MerchantOrders() {
  return (
    <>
      <BreadCrumb current="Orders" classes="mb-5" />
      <Suspense fallback={<DashboardSpinner />}>
        <PageContent />
      </Suspense>
    </>
  );
}
