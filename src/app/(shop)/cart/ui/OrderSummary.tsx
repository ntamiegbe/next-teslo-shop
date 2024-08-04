"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace('/empty');
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. of Products</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">₦{(subTotal)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">₦{(total)}</span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <Link
          className="flex btn-primary justify-center"
          href="/checkout">
          Checkout
        </Link>
      </div>
    </>

  );
};
