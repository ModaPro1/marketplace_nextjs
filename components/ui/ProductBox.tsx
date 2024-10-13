import { Product } from "@prisma/client";
import ImagesSlider from "./ImagesSlider";
import Link from "next/link";
import MerchantDeleteProduct from "../Merchant/DeleteProduct";
import Dropdown from "./Dropdown";
import { BsThreeDots } from "react-icons/bs";

export default function ProductBox(props: { product: Product; isAdmin?: boolean}) {

  return (
    <div className="product relative">
      <div className="h-48 md:h-56">
        <ImagesSlider images={props.product.images_list} imageProps={{sizes: "(max-width: 767px) 50vw, (max-width: 991px) 33vw, 25vw"}} delay={2500} />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="mt-5">{props.product.name}</h3>
        {props.isAdmin && (
          <Dropdown icon={<BsThreeDots />}>
            <div className="overflow-hidden *:block *:px-3 *:py-2 *:w-full">
              <Link
                href={`/merchant_dashboard/products/edit/${props.product.id}`}
                className="hover:bg-gray-200 transition"
              >
                Edit
              </Link>
              <MerchantDeleteProduct id={props.product.id} />
            </div>
          </Dropdown>
        )}
      </div>
      <p className="font-semibold text-xs mt-1">
        USD <span className="text-xl">{props.product.price}</span>
      </p>
      {!props.isAdmin && (
        <Link
          href={`/products/${props.product.id}`}
          className="border text-main transition duration-300 hover:bg-main hover:text-white rounded-2xl px-3 py-1 text-sm border-main mt-2 block w-fit"
        >
          More Details
        </Link>
      )}
    </div>
  );
}
