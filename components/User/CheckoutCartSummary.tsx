import { CartWithProduct } from "@/actions/user";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutCartSummary({ cart }: { cart: any }) {
  const total = cart.reduce((acc: number, item: CartWithProduct) => {
    const option = item.option;
    const unitPrice = item.product.price + (option ? option.price : 0);
    const itemPrice = unitPrice * item.quantity;
    return acc + itemPrice;
  }, 0);

  const uniqueProductIds = new Set(cart.map((item: CartWithProduct) => item.product.id));
  const totalShipping = Array.from(uniqueProductIds).reduce((acc, productId) => {
    const product = cart.find((item: CartWithProduct) => item.product.id === productId);
    return acc + (product?.product.shipping_price || 0);
  }, 0);
  
  return (
    <div className="p-3 rounded-sm bg-gray-200 w-full sm:w-80 sticky top-0">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-300">
        <h4 className="text-lg">Order summary ({cart.length})</h4>
        <Link href="/cart" className="underline text-sm">
          Edit Cart
        </Link>
      </div>
      <div className="mb-3 pb-3 border-b border-gray-300">
        {cart.map((item: CartWithProduct) => {
          const option = item.option;
          const unitPrice = item.product.price + (option ? option.price : 0);
          
          return (
            <div key={item.id} className="flex gap-3 mb-3 items-start">
              <Link href={`/products/${item.product.id}`}>
                <Image
                  src={item.product.images_list[0]}
                  width={100}
                  height={100}
                  alt="Product Image"
                  className="w-16 h-16"
                />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between items-center flex-wrap">
                  <div>
                    <h5 className="text-sm">{item.product.name}</h5>
                    {option && <p className="text-gray-500 text-xs">{option.name}</p>}
                  </div>
                  <div>${unitPrice}</div>
                </div>
                <div className="text-gray-500 text-xs mt-2">QTY. {item.quantity}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mb-2 text-sm">
        <span>Subtotal</span>
        <span>${total}</span>
      </div>
      <div className="flex justify-between mb-2 text-sm">
        <span>Delivery</span>
        <span>${totalShipping as number}</span>
      </div>
      <div className="flex justify-between text-lg pt-3 mt-3 border-t border-t-gray-300">
        <span>Total</span>
        <span>${totalShipping + total}</span>
      </div>
    </div>
  );
}
