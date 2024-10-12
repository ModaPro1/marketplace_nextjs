'use client'

import { merchantDeleteProduct } from "@/actions/merchant";
import { useDeleteModal } from "@/lib/hooks/deleteItem";

export default function MerchantDeleteProduct({ id }: { id: string }) {
  const { confirmDelete } = useDeleteModal(merchantDeleteProduct);
  
  return <button className="text-start transition hover:bg-red-600 hover:text-white" onClick={() => confirmDelete(id)}>Delete</button>;
}
