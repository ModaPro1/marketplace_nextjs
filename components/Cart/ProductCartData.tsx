"use client";
import { Product, ProductOption } from "@prisma/client";
import clsx from "clsx";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useContext, useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemQuantity from "./Quantity";
import { CartContext } from "@/context/UserCartContext";

export default function ProductCartData({ product }: { product: Product & { options: ProductOption[] } }) {
  const options = product.options;
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [price, setPrice] = useState(product.price);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { addItem } = useContext(CartContext);

  function setOption(id: string) {
    setSelectedOption((prev) => (prev == id ? null : id));
  }

  useEffect(() => {
    let basePrice = product.price;

    if (selectedOption !== null) {
      const option = options?.find((option) => option.id === selectedOption)!;
      basePrice += option.price;
    }

    setPrice(+(basePrice * quantity).toFixed(2));
  }, [selectedOption, quantity]);

  async function addToCart() {
    try {
      setButtonLoading(true);
      await addItem(
        product,
        quantity,
        options.find((option) => option.id === selectedOption)
      );

      toast.success("Product added to the cart", {
        position: "top-center",
        closeOnClick: true,
        autoClose: 1000,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to add product to the cart", {
        position: "top-center",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
    setButtonLoading(false);
  }

  return (
    <div className="space-y-5 mt-5">
      {options && options.length > 0 && (
        <>
          <div className="flex gap-3 flex-wrap">
            {options.map((option) => {
              return (
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => setOption(option.id)}
                  key={option.id}
                  className={clsx(
                    "text-sm transition cursor-pointer border rounded-md px-2 py-1 hover:border-gray-600 select-none",
                    { "border-gray-600": selectedOption == option.id, "border-gray-300": selectedOption != option.id }
                  )}
                >
                  {option.name}
                </div>
              );
            })}
          </div>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </>
      )}
      <div className="mt-5">
        <h5 className="font-semibold mb-3 text-sm">Choose Quantity</h5>
        <ItemQuantity quantity={quantity} onChange={(quantity) => setQuantity(quantity)} />
      </div>
      <div className="mt-5 flex justify-between items-center">
        <h3 className="text-lg font-semibold">${price}</h3>
        <button
          onClick={addToCart}
          disabled={buttonLoading}
          className="flex items-center gap-2 border-2 border-main rounded-2xl px-3 text-main font-semibold py-1 text-sm disabled:opacity-70 focus:outline-none focus:ring focus:ring-main/30 transition"
        >
          {buttonLoading ? <CgSpinnerAlt className="animate-spin" fontSize={21} /> : <LiaCartPlusSolid fontSize={21} />}
          Add to cart
        </button>
      </div>
    </div>
  );
}
