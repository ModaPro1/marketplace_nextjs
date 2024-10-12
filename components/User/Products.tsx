import { PrismaClient } from "@prisma/client";
import ProductBox from "../ui/ProductBox";

export default async function Products({ searchParams }: { searchParams: any }) {
  const prisma = new PrismaClient();
  const { cat: categoryFilter, sort, minPrice, maxPrice, s: searchKeyword, page } = searchParams;

  // Determine the sort field and order based on the sort parameter
  const validFields = ["price", "updatedAt"];
  const validOrders = ["asc", "desc"];

  let orderBy = {};
  if (sort) {
    const [order, field] = sort.split(" "); // e.g., "asc price" => ["asc", "price"]
    if (validFields.includes(field) && validOrders.includes(order)) {
      // validation
      orderBy = { [field]: order }; // ["asc", "price"] => {"price": "asc"} and now we can use it to apply filter in prisma query
    }
  }

  const products = await prisma.product.findMany({
    where: {
      ...(categoryFilter ? { category: { name: categoryFilter } } : {}),
      ...(maxPrice && !isNaN(maxPrice) ? { price: { lte: parseFloat(maxPrice) } } : {}),
      ...(minPrice && !isNaN(minPrice) ? { price: { gte: parseFloat(minPrice) } } : {}),
      ...(searchKeyword ? { name: { contains: searchKeyword, mode: "insensitive" } } : {}),
    },
    orderBy: orderBy,
  });

  if (products.length <= 0) {
    return <h1 className="text-center mt-10">No products for this filter.</h1>;
  }

  return (
    <div className="products mt-10 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-5 md:gap-10">
      {products.map((product) => (
        <ProductBox product={product} key={product.id} />
      ))}
    </div>
  );
}
