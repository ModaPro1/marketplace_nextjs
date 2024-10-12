"use client";
import { CartContext } from "@/context/UserCartContext";
import { useContext } from "react";

export default function RemoveFromCartButton({ itemId }: { itemId: string }) {
  const { removeItem } = useContext(CartContext);
  return (
    <button className="text-xs text-blue-500" onClick={() => removeItem(itemId)}>
      Remove
    </button>
  );
}
