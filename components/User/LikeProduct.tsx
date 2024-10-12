  "use client";
  import { FaRegHeart, FaHeart } from "react-icons/fa";
  import Tooltip from "../ui/Tooltip";
  import { startTransition, useOptimistic } from "react";
  import { likeProduct } from "@/actions/user";

  export default function LikeProduct({ productId, productIsLiked }: { productId: string; productIsLiked: boolean }) {
    const [optimisticIsLiked, addOptimisticLike] = useOptimistic(
      productIsLiked,
      (currentState, optimisticValue: boolean) => optimisticValue
    );

    async function buttonClick() {
      startTransition(() => {
        addOptimisticLike(!optimisticIsLiked);
      })
      await likeProduct(productId)
    }
    

    return (
      <Tooltip text="Like Product" classes="py-1">
        <button className="px-6 py-3 rounded-3xl bg-gray-200 group" onClick={buttonClick}>
          {optimisticIsLiked ? (
            <FaHeart fontSize={20} className="transition group-hover:animate-[scale_.4s] text-red-900" />
          ) : (
            <FaRegHeart fontSize={20} className="transition group-hover:animate-[scale_.4s]"/>
          )}
        </button>
      </Tooltip>
    );
  }
