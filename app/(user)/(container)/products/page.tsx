import Products from "@/components/User/Products";
import ProductsFilter from "@/components/Filter";
import FilterSkeleton from "@/components/ui/skeleton/Filter";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import ProductsSkeleton from "@/components/ui/skeleton/Products";

async function Filter(props: { searchParams: any }) {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  return <ProductsFilter categories={categories} />;
}

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
  return (
    <>
      <div className="products">
        <Suspense fallback={<FilterSkeleton />}>
          <Filter searchParams={searchParams} />
        </Suspense>
        <h1 className="font-semibold text-lg">All Products For You!</h1>
        <Suspense key={Math.random()} fallback={<ProductsSkeleton />}>
          <Products searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
