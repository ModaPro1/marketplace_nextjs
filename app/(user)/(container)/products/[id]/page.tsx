import ProductCartData from "@/components/Cart/ProductCartData";
import ImagesSlider from "@/components/ui/ImagesSlider";
import ProductPageSkeleton from "@/components/ui/skeleton/ProductPage";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PiStorefront } from "react-icons/pi";
import Tooltip from "@/components/ui/Tooltip";
import CopyProductLink from "@/components/User/CopyProductLink";
import LikeProduct from "@/components/User/LikeProduct";
import { getSession } from "@/lib/auth";

async function Product({ id }: { id: string }) {
  const session = await getSession()
  const product = await prisma.product.findUnique({ where: { id: id }, include: { options: true } });
  if (!product) {
    return notFound();
  }
  const productIsLiked = await prisma.productLike.findMany({where: {productId: id, userId: session.userId}})
  
  return (
    <div className="flex mt-10 gap-10 flex-col md:flex-row">
      <div className="slider w-full sm:w-[60%] mb-20 md:mb-0 h-72 md:h-96 md:w-[50%]">
        <ImagesSlider images={product.images_list} pagination={true} imageProps={{sizes: "(max-width: 768px) 100vw, 50vw" }} />
      </div>
      <div className="flex-1">
        <h2 className="font-semibold text-3xl">{product.name}</h2>
        <p className="text-gray-400 mt-4">{product.description}</p>
        <div className="h-[1px] w-full bg-gray-300 mt-5"></div>
        <ProductCartData product={product} />
        <div className="h-[1px] w-full bg-gray-300 mt-5"></div>
        <div className="mt-5 flex gap-2">
          <Tooltip text="View Merchant" classes="py-1">
            <Link href={`/merchant/${product.merchantId}`} className="px-6 py-3 rounded-3xl bg-gray-200 block">
              <PiStorefront fontSize={20} />
            </Link>
          </Tooltip>
          <CopyProductLink link={`/products/${product.id}`} />
          {session.userType == "user" && (<LikeProduct productIsLiked={!!(productIsLiked.length > 0)} productId={product.id} />)}
        </div>
        <div className="h-[1px] w-full bg-gray-300 mt-5"></div>
        <div className="mt-5">
          <h5 className="font-semibold mb-2 text-sm uppercase">Shipping info</h5>
          <p className="text-gray-600">{product.shipping_info_text}</p>
        </div>
        <div className="mt-5">
          <h5 className="font-semibold mb-2 text-sm uppercase">Refund & Return Policy</h5>
          <p className="text-gray-600">{product.return_policy_text}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <Product id={params.id} />
    </Suspense>
  );
}
