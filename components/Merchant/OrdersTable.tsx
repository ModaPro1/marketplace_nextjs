'use client'
import { deleteOrder } from "@/actions/merchant";
import { useDeleteModal } from "@/lib/hooks/deleteItem";
import { Order } from "@prisma/client";
import Tooltip from "../ui/Tooltip";
import Link from "next/link";
import { PiFolderOpen } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function OrdersTable({ orders, max, addBtns }: { orders: Order[]; max?: number; addBtns?: boolean }) {
  let outputOrders = max ? orders.slice(0, max) : orders;
  const { confirmDelete } = useDeleteModal(deleteOrder);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Buyer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Order Date
            </th>
            {addBtns && <th></th>}
          </tr>
        </thead>
        <tbody>
          {outputOrders.length > 0 ? (
            outputOrders.slice(0, 5).map((order) => {
              return (
                <tr key={order.id} className="bg-white border-b">
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4">
                    {order.status == "success" ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-xl">Paid</span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-xl">Failed</span>
                    )}
                  </td>
                  <td className="px-6 py-4">${order.totalPrice / 100}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toDateString()}</td>
                  {addBtns && (
                    <>
                      <td className="px-6 py-4 flex items-center gap-2 text-lg">
                        <Tooltip text="View order" classes="py-0">
                          <Link href={`/merchant_dashboard/orders/${order.id}`} className="transition hover:text-main">
                            <PiFolderOpen />
                          </Link>
                        </Tooltip>
                        <Tooltip text="Delete order" classes="py-0">
                          <button className="inline transition hover:text-red-700" onClick={() => confirmDelete(order.id)}>
                            <RiDeleteBin6Line />
                          </button>
                        </Tooltip>
                      </td>
                    </>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="px-6 py-2">You have no orders yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}