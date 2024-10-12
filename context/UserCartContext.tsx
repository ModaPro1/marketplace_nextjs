"use client";

import { addProductToCart, getUserCart, removeCartItem, updateItemQuantity } from "@/actions/user";
import { Cart, Product, ProductOption } from "@prisma/client";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartItem {
  id: string;
  quantity: number;
  product: Product;
  totalPrice: number;
  option?: ProductOption;
}

interface ContextType {
  cart: CartItem[];
  isLoading: boolean;
  addItem: (product: Product, quantity: number, option?: ProductOption) => void;
  removeItem: (id: string) => void;
  changeItemQuantity: (id: string, quantity: number) => void
}

// Create the CartContext with default values
export const CartContext = createContext<ContextType>({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  isLoading: true,
  changeItemQuantity: () => {}
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getCartData() {
      const cart = await getUserCart();
      if (!cart) {
        return;
      }
      const formattedCartData = cart.map((item) => {
        const totalPrice = (item.product.price + (item.option?.price || 0)) * item.quantity;
        return { id: item.id, quantity: item.quantity, product: item.product, option: item.option, totalPrice };
      });
      setCart(formattedCartData);
      setIsLoading(false)
    }
    getCartData();
  }, []);

  const addItem = async (product: Product, quantity: number, option?: ProductOption) => {
    // Calculate total price
    const totalPrice = (product.price + (option?.price || 0)) * quantity;

    const result = await addProductToCart(product.id, quantity, option?.id);
    if(result.success) {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: result.id!,
          product,
          quantity,
          totalPrice,
          option: option,
        },
      ]);
    } else {
      throw new Error(result.message)
    }
  };

  const removeItem = async (id: string) => {
    const previousCart = [...cart];
  
    // Optimistic UI update
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  
    try {
      await removeCartItem(id);
    } catch (error) {
      // Rollback if error
      setCart(previousCart);
    }
  };

  const changeItemQuantity = async (id: string, quantity: number) => {
    const previousCart = [...cart];
  
    // Optimistic UI update
    setCart((prevCart) => 
      prevCart.map((item) => 
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  
    try {
      await updateItemQuantity(id, quantity);
    } catch (error) {
      // Rollback if error
      setCart(previousCart);
    }
  }

  return <CartContext.Provider value={{ cart, isLoading, addItem, removeItem, changeItemQuantity }}>{children}</CartContext.Provider>;
};
