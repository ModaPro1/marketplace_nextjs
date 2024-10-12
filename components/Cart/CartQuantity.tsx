'use client'

import { useEffect, useState } from "react";
import ItemQuantity from "./Quantity";
import { updateItemQuantity } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function CartQuantity({itemId, initialQuantity }: {itemId: string, initialQuantity: number }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const router = useRouter()

  useEffect(() => {
    updateItemQuantity(itemId, quantity)
    router.refresh()
  }, [quantity])

  return <ItemQuantity quantity={quantity} onChange={setQuantity} />
}
