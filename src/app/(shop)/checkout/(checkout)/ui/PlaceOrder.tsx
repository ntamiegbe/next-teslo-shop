"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { useCartStore } from "@/store";
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { itemsInCart, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore( state => state.cart );
  const clearCart = useCartStore( state => state.clearCart );

  useEffect(() => {
    setLoaded(true);
  }, []);


  const onPlaceOrder = async() => {
    setIsPlacingOrder(true);
    // await sleep(2);

    const productsToOrder = cart.map( product => ({
      productId: product.id,
      quantity: product.quantity,
    }))

    //* Todo salio bien!
    clearCart();
  }

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order Summary</h2>

      <div className="grid grid-cols-2">
        <span>No. of products</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="text-red-500">{ errorMessage }</p>

        <button
          // href="/orders/123"
          onClick={ onPlaceOrder }
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
