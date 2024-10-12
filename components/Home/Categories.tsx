import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      name: "Men's Clothing",
      image: "mens_clothings.png",
    },
    {
      name: "Electronics & Devices",
      image: "electronics.png",
    },
    {
      name: "Home Appliances",
      image: "home.png",
    },
    {
      name: "Toys & Games",
      image: "toys.png",
    },
    {
      name: "Women's Clothing",
      image: "women_clothings.png",
    },
    {
      name: "Shoes",
      image: "shoes.png",
    },
  ];

  return (
    <div id="categories" className="py-10">
      <div className="custom-container">
        <h1 className="text-center text-2xl font-medium">Shop by categories</h1>
        <div className="list flex justify-center mt-10 gap-10 flex-wrap">
          {categories.map((category) => {
            return (
<<<<<<< HEAD
              <Link href="#" className="text-center w-[100px] md:w-[120]">
=======
              <Link key={category.name} href={`/products?cat=${encodeURIComponent(category.name)}`} className="text-center w-[100px] md:w-[120]">
>>>>>>> master
                <Image src={`/assets/categories/${category.image}`} alt={category.name} width={440} height={440} className="rounded-full" />
                <h5 className="mt-5 leading-5">{category.name}</h5>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
