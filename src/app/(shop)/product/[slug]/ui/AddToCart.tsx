"use client";

import { useState } from "react";
import { QuantitySelector } from "@/components";
import type { CartProduct, Product } from "@/interfaces";
import { useCartStore } from '@/store';
import { Plus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore( state => state.addProductTocart );
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const router = useRouter();

  const addToCart = () => {
    setPosted(true);

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      image: product.images[0]
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
  };

  const placeOrder = () => {
    setPosted(true);

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      image: product.images[0]
    }

    addProductToCart(cartProduct);
    router.push('/cart');

  }

  return (
    <>
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <div className="flex items-center gap-x-4 justify-between">
        <motion.button
          onClick={placeOrder}
          disabled={posted}
          className="my-3 w-full flex items-center justify-center border border-[#1e186f] text-[#1e186f] bg-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} className="mr-2" />
          Order now
        </motion.button>
        <motion.button
          onClick={addToCart}
          disabled={posted}
          className="my-3 w-full flex items-center justify-center bg-[#1e186f] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={20} className="mr-2" />
          Add to Cart
        </motion.button>
      </div>
    </>
  );
};
