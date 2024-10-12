import BreadCrumb from "@/components/Merchant/BreadCrumb";
import EditProductForm from "@/components/Merchant/EditProduct";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProduct({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { category: true, options: true } });
  if (!product) {
    notFound();
  }
  const categories = await prisma.category.findMany({ select: { name: true } });
  const categoriesArray = categories.map((cat) => cat.name);


  return (
    <>
      <BreadCrumb current="Edit Product" classes="mb-5" history={[{link: "/products", title: "Products"}]} />
      <EditProductForm categories={categoriesArray} product={product} />
    </>
  );
}
