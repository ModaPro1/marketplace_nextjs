import ProductBox from "@/components/ui/ProductBox";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";

export default async function MerchantPage({ params }: { params: { id: string } }) {
  const merchantId = params.id;
  if (!merchantId) {
    notFound();
  }
  const merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
  if (!merchant) {
    notFound();
  }
  const totalLikesCount = await prisma.productLike.count({ where: { product: { merchantId } } });
  const totalProductsCount = await prisma.product.count({ where: { merchantId } });
  const latestProducts = await prisma.product.findMany({
    where: { merchantId },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="bg-white shadow p-3 rounded-md flex gap-4 mt-10">
        <Image src={merchant.store_image} alt="Merchant Store Image" width={120} height={120} className="rounded-md" />
        <div>
          <h2 className="mt-1 font-medium text-xl">{merchant.store_name}</h2>
          <div className="mt-3">
            <p className="text-sm text-gray-600">
              <FaEnvelope className="inline me-2" />
              {merchant.email}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <FaHeart className="inline me-2" />
              {totalLikesCount} Store likes
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <HiMiniShoppingBag className="inline me-2" />
              {totalProductsCount} {totalProductsCount === 1 ? "Product" : "Products"}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow p-3 rounded-md mt-3">
        <h2 className="mb-2 pb-2 border-b font-medium text-lg">Latest Products</h2>
        <div className="grid grid-cols-4 gap-5">
          {latestProducts.map((product) => {
            return <ProductBox product={product} key={product.id} />;
          })}
        </div>
      </div>
    </>
  );
}
