"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import { ComponentProps, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import { PaginationOptions } from "swiper/types";

interface ImagesSliderProps {
  images: string[];
  pagination?: boolean;
  delay?: number;
  imageProps?: Omit<ComponentProps<typeof Image>, "src" | "alt">;
}

export default function ImagesSlider(props: ImagesSliderProps) {
  const [loaded, setLoaded] = useState(false);
  const paginationConfig: PaginationOptions = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      const originalSrc = props.images[index];
      const transformedSrc = originalSrc.replace('/upload/', '/upload/h_100,w_100/');
      return `<span class="${className}">
        <img src="${transformedSrc}" width="100px" height="100px"/>
      </span>`;
    },
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (loaded) {
    return (
      <>
        <Swiper
          pagination={props.pagination ? paginationConfig : {}}
          className={`h-full ${props.pagination ? "custom-pagination-swiper" : ""}`}
          spaceBetween={30}
          effect="fade"
          modules={props.pagination ? [EffectFade, Autoplay, Pagination] : [EffectFade, Autoplay]}
          autoplay={{
            delay: props.delay || 2500,
            disableOnInteraction: false,
          }}
          loop
        >
          {props.images.map((image, index) => (
            <SwiperSlide key={`${image}-${index}`}>
              <Image src={image} alt={`Product Image ${index + 1}`} fill {...props.imageProps} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  } else {
    return (
      <>
        <div className="animate-pulse w-full h-full bg-gray-200"></div>
        {props.pagination && (
          <div className="animate-pulse flex gap-[10px] mt-[10px]">
            <div className="bg-gray-200 h-[60px] w-[60px] md:w-[100px] md:h-[100px]"></div>
            <div className="bg-gray-200 h-[60px] w-[60px] md:w-[100px] md:h-[100px]"></div>
            <div className="bg-gray-200 h-[60px] w-[60px] md:w-[100px] md:h-[100px]"></div>
          </div>
        )}
      </>
    );
  }
}
