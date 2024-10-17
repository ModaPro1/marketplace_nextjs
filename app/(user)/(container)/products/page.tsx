import Products from "@/components/User/Products";
import ProductsFilter from "@/components/Filter";
import FilterSkeleton from "@/components/ui/skeleton/Filter";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import ProductsSkeleton from "@/components/ui/skeleton/Products";

async function Filter() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  return <ProductsFilter categories={categories} />;
}

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
  return (
    <>
      <div className="products relative">
        <Suspense fallback={<FilterSkeleton />}>
          <Filter />
        </Suspense>
        <h1 className="font-semibold text-lg">All Products For You!</h1>
        <Suspense key={Math.random()} fallback={<ProductsSkeleton />}>
          <Products searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
