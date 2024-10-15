import BreadCrumb from "@/components/Merchant/BreadCrumb";
import DashboardSpinner from "@/components/Merchant/DashboardSpinner";
import ProductBox from "@/components/ui/ProductBox";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";

async function Products() {
  const session = await getSession();
  const merchantProducts = await prisma.product.findMany({
    where: {
      merchant: {
        id: session.userId,
      },
    },
    include: {
      likes: true
    }
  });

  if (merchantProducts.length == 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="font-semibold text-xl text-slate-700">You have no products yet.</h1>
        <Link
          href="/merchant_dashboard/products/add"
          className="mt-5 block w-fit bg-main p-2 rounded-lg text-white text-sm mx-auto"
        >
          Add new product
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/merchant_dashboard/products/add"
        className="mb-5 block w-fit bg-main px-3 py-2 rounded-lg text-white text-sm"
      >
        Add new product
      </Link>
      <div className="products mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {merchantProducts.map((product) => {
          return <ProductBox isAdmin={true} key={product.id} product={product} likes={product.likes.length} />;
        })}
      </div>
    </>
  );
}

export default function MerchantProductsPage() {
  return (
    <div>
      <BreadCrumb current="Products" classes="mb-5" />
      <Suspense fallback={<DashboardSpinner />}>
        <Products />
      </Suspense>
    </div>
  );
}
