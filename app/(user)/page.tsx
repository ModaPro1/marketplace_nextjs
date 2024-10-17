import Categories from "@/components/Home/Categories";
import Landing from "@/components/Home/Landing";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import LatestProductsSlider, { LatestProductsSkeleton } from "@/components/Home/LatestProducts";
import { Suspense } from "react";
import Footer from "@/components/User/Footer";

async function LatestProducts() {
  const latestProducts = await prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 6 });
  return (
    <div className="custom-container overflow-x-hidden">
      <div className="flex justify-between items-end mb-7">
        <h1 className="text-2xl font-medium">Latest Products</h1>
        <Link href="/products" className="text-sm text-main flex items-center focus:underline">
          <span className="me-1">Browse All Products</span>
          <FaAngleRight />
        </Link>
      </div>
      <LatestProductsSlider latestProducts={latestProducts} />
    </div>
  );
}

export default async function Home() {
  const session = await getSession();
  if (session.userType == "merchant") {
    return redirect("/merchant_dashboard");
  }

  return (
    <>
      <Landing />
      <Suspense fallback={<LatestProductsSkeleton />}>
        <LatestProducts />
      </Suspense>
      <Categories />
      <Footer />
    </>
  );
}
