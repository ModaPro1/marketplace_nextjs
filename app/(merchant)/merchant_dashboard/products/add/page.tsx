
import AddProductForm from "@/components/Merchant/AddProduct";
import BreadCrumb from "@/components/Merchant/BreadCrumb";
import { prisma } from "@/lib/prisma";

export default async function AddProductPage() {
  const categories = await prisma.category.findMany({ select: { name: true } });
  const categoriesArray = categories.map((cat) => cat.name);

  return (
    <>
      <BreadCrumb current="Add Product" classes="mb-5" history={[{link: "/products", title: "Products"}]} />
      <AddProductForm categories={categoriesArray} />
    </>
  );
}
