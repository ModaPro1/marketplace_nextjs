import { PrismaClient } from "@prisma/client";
import ProductBox from "../ui/ProductBox";
import Pagination from "./Pagination";

export default async function Products({ searchParams }: { searchParams: any }) {
  const prisma = new PrismaClient();
  const { cat: categoryFilter, sort, minPrice, maxPrice, s: searchKeyword, page } = searchParams;

  const validFields = ["price", "updatedAt"];
  const validOrders = ["asc", "desc"];
  let orderBy: any = {};

  if (sort) {
    const [order, field] = sort.split(" ");
    if (validFields.includes(field) && validOrders.includes(order)) {
      orderBy = { [field]: order };
    }
  }

  const currentPage = page ? parseInt(page, 10) : 0;
  const pageSize = 8;

  const products = await prisma.product.findMany({
    where: {
      ...(categoryFilter ? { category: { name: categoryFilter } } : {}),
      ...(maxPrice && !isNaN(maxPrice) ? { price: { lte: parseFloat(maxPrice) } } : {}),
      ...(minPrice && !isNaN(minPrice) ? { price: { gte: parseFloat(minPrice) } } : {}),
      ...(searchKeyword ? { name: { contains: searchKeyword, mode: "insensitive" } } : {}),
    },
    skip: currentPage * pageSize,
    take: pageSize,
    orderBy: orderBy,
  });

  const totalProducts = await prisma.product.count({
    where: {
      ...(categoryFilter ? { category: { name: categoryFilter } } : {}),
      ...(maxPrice && !isNaN(maxPrice) ? { price: { lte: parseFloat(maxPrice) } } : {}),
      ...(minPrice && !isNaN(minPrice) ? { price: { gte: parseFloat(minPrice) } } : {}),
      ...(searchKeyword ? { name: { contains: searchKeyword, mode: "insensitive" } } : {}),
    },
  });

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (products.length <= 0) {
    return <h1 className="text-center mt-10">No products for this filter.</h1>;
  }

  return (
    <>
      <div className="products mt-10 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-5 md:gap-10">
        {products.map((product) => (
          <ProductBox product={product} key={product.id} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
