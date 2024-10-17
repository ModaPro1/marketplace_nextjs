"use client";

import ItemQuantity from "@/components/Cart/Quantity";
import RemoveFromCartButton from "@/components/Cart/RemoveButton";
import { CartContext } from "@/context/UserCartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function UserCart() {
  const { cart, isLoading, changeItemQuantity } = useContext(CartContext);

  if (isLoading) {
    return <h2 className="text-center mt-5 text-xl">Loading your cart...</h2>;
  }

  return (
    <div className="w-full sm:w-[80%] sm:mx-auto bg-white p-3 rounded-md shadow mt-10">
      <h1 className="mb-5 pb-3 border-b text-xl">Your Shopping cart</h1>
      {cart.length > 0 ? (
        cart.map((item) => {
          const option = item.option;
          return (
            <div key={item.id} className="flex gap-5 mb-3 items-start">
              <Link href={`/products/${item.product.id}`} className="w-28 h-28 relative">
                <Image src={item.product.images_list[0]} fill alt="Product Image" />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between items-center flex-wrap">
                  <h5 className="font-semibold">{item.product.name}</h5>
                  <div>
                    ${(option ? (item.product.price + option.price) * item.quantity : item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                {option && (
                  <div className="py-1 px-2 border border-gray-500 text-xs rounded-md w-fit mt-2 mb-4">
                    {option.name}
                  </div>
                )}
                <div className="flex justify-between mt-3 items-center">
                  <ItemQuantity
                    quantity={item.quantity}
                    onChange={(quantity) => changeItemQuantity(item.id, quantity)}
                  />
                  <RemoveFromCartButton itemId={item.id} />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">You have no products in your cart.</p>
      )}
      <Link
        href="/checkout"
        className="mt-4 px-3 py-2 bg-black text-white rounded-md flex justify-center items-center "
      >
        Continue to checkout
      </Link>
    </div>
  );
}
