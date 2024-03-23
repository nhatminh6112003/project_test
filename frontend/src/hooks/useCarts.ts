import { useCallback, useEffect, useState } from "react";

export interface CartItem {
  id: number;
  point: number;
  tag: string[];
  coverImage: string;
  writer: string;
  title: string;
  quantity: number;
}

export function useCarts() {
  const getCarts = useCallback(() => {
    const cartsStr = localStorage.getItem("carts");
    return cartsStr ? JSON.parse(cartsStr) : [];
  }, []);
  const [carts, setCarts] = useState<CartItem[] | null>();
  useEffect(() => {
    setCarts(getCarts());
  }, []);

  const addCart = useCallback(
    (newCartItem: CartItem) => {
      const carts = getCarts();
      const existingCartItemIndex = carts.findIndex(
        (cart: CartItem) => cart.id === newCartItem.id
      );

      if (existingCartItemIndex !== -1) {
        // carts[existingCartItemIndex].point += newCartItem.point;
        carts[existingCartItemIndex].quantity += 1;
      } else {
        carts.push({
          ...newCartItem,
          quantity: 1,
        });
      }

      localStorage.setItem("carts", JSON.stringify(carts));
      console.log("TCL: useCarts -> getCarts()", getCarts());
      setCarts(getCarts());
      alert("Add to cart success!");
    },
    [getCarts]
  );

  const removeCart = useCallback(
    (itemId: number) => {
      const carts = getCarts();
      const updatedCarts = carts.filter((cart: CartItem) => cart.id !== itemId);
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
      setCarts(getCarts());
      alert("Remove book success!");
    },
    [getCarts]
  );

  return { carts, getCarts, addCart, removeCart,setCarts };
}
