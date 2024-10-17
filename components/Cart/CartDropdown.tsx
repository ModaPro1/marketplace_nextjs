"use client";
import { PiShoppingCartBold } from "react-icons/pi";
import Dropdown from "../ui/Dropdown";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCartButton from "./RemoveButton";
import { useContext } from "react";
import { CartContext } from "@/context/UserCartContext";

export default function CartDropdown() {
  const { cart, isLoading } = useContext(CartContext);

  return (
    <Dropdown rightDropdown disabled={isLoading} count={cart.length} icon={<PiShoppingCartBold className="text-xl" />}>
      <div className="px-3 py-2 w-72">
        <h2 className="mb-2 pb-2 border-b">Shopping Cart</h2>
        <div className="items">
          {cart.length > 0 ? (
            <>
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-5 mb-3 items-start">
                  <Link href={`/products/${item.product.id}`}>
                    <Image
                      src={item.product.images_list[0]}
                      width={100}
                      height={100}
                      alt="Product Image"
                      className="w-16 h-16 object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between items-center flex-wrap">
                      <h5 className="text-sm font-medium">{item.product.name}</h5>
                    </div>
                    <div className="flex justify-between mt-2 items-center">
                      <p className="text-xs text-gray-400">QTY. {item.quantity}</p>
                      <RemoveFromCartButton itemId={item.id} />
                    </div>
                  </div>
                </div>
              ))}
              {cart.length > 3 && <p className="text-sm text-gray-700">{cart.length - 3} more item(s)</p>}
              <div className="flex justify-between mt-3">
                <Link
                  href="/cart"
                  className="px-3 py-2 block border border-gray-300 transition hover:border-gray-500 rounded-md text-sm"
                >
                  View Cart
                </Link>
                <Link href="/checkout" className="px-3 py-2 flex items-center bg-black text-white rounded-md text-sm">
                  Checkout
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-sm">No products in your cart</p>
          )}
        </div>
      </div>
    </Dropdown>
  );
}
