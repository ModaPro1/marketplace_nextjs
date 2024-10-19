"use client";

import { Product } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductBox from "../ui/ProductBox";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "@/public/css/swiper-landing.css";
import Link from "next/link";
import { TbShoppingBag } from "react-icons/tb";

export function LatestProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] sm:gap-[30px]">
      <div className="animate-pulse">
        <div className="bg-gray-200 h-48 md:h-56"></div>
        <div className="bg-gray-200 w-full h-6 mt-5"></div>
      </div>
      <div className="animate-pulse">
        <div className="bg-gray-200 h-48 md:h-56"></div>
        <div className="bg-gray-200 w-full h-6 mt-5"></div>
      </div>
      <div className="animate-pulse hidden sm:block">
        <div className="bg-gray-200 h-48 md:h-56"></div>
        <div className="bg-gray-200 w-full h-6 mt-5"></div>
      </div>
      <div className="animate-pulse hidden md:block">
        <div className="bg-gray-200 h-48 md:h-56"></div>
        <div className="bg-gray-200 w-full h-6 mt-5"></div>
      </div>
    </div>
  );
}

export default function LatestProductsSlider({ latestProducts }: { latestProducts: Product[] }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LatestProductsSkeleton />;
  }

  return (
    <Swiper
      className="latest-products-swiper select-none"
      slidesPerView={2}
      spaceBetween={20}
      breakpoints={{ 767: { slidesPerView: 3, spaceBetween: 30 }, 1024: { slidesPerView: 4 } }}
      navigation={true}
      modules={[Navigation]}
    >
      {latestProducts.map((product) => (
        <SwiperSlide className="relative" key={product.id}>
          <ProductBox product={product} key={product.id} />
        </SwiperSlide>
      ))}
      <SwiperSlide>
        <div className="mt-20 ps-0 sm:ps-5">
          <Link href="/products?sort=asc+updatedAt" className="text-sm sm:text-base font-semibold flex items-center gap-2 text-main bg-main bg-opacity-20 py-2 px-3 w-fit rounded hover:scale-105 active:scale-95 transition">
            <TbShoppingBag className="text-xl" />
            Browse More
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
