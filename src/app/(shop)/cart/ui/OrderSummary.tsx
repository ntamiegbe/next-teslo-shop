"use client";

import { useCartStore } from "@/store";
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
          className="my-3 w-full flex items-center justify-center bg-[#1e186f] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          href="/checkout">
          Checkout
        </Link>
      </div>
    </>
  );
};
