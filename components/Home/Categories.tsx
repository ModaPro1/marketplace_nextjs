import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const categories = await prisma.category.findMany()

  return (
    <div id="categories" className="py-10">
      <div className="custom-container">
        <h1 className="text-center text-xl sm:text-2xl font-medium">Shop by categories</h1>
        <div className="list flex justify-center mt-10 gap-10 flex-wrap">
          {categories.map((category) => {
            return (
              <Link key={category.name} href={`/products?cat=${encodeURIComponent(category.name)}`} className="text-center w-[100px] md:w-[120]">
                <Image src={category.image} alt={category.name} width={150} height={150} className="rounded-full" />
                <h5 className="mt-5 leading-5">{category.name}</h5>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
