'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { QuantitySelector } from "@/components";
import { useCartStore } from '@/store';
import type { CartProduct, Product } from '@/interfaces';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  product: Product;
}

export default function ProductGridItem({ product }: Props) {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const addProductToCart = useCartStore(state => state.addProductTocart);

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
    setShowToast(true);
    setTimeout(() => {
      setPosted(false);
      setQuantity(1);
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <div
        className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-white p-2"
      >
        <div className="relative">
          <Link href={`/product/${product.id}`}>
            <Image
              src={displayImage}
              alt={product.title}
              className="w-full h-[300px] object-cover transition-transform duration-300 transform hover:scale-105"
              width={500}
              height={300}
            />
          </Link>
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-2 flex space-x-2">
              {product.images.map((img, index) => (
                <motion.div
                  key={index}
                  className={`w-12 h-12 rounded-md overflow-hidden border-2 ${displayImage === img ? 'border-indigo-500' : 'border-transparent'}`}
                  onMouseEnter={() => setDisplayImage(img)}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - ${index + 1}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Link href={`/product/${product.id}`} className="p-8">
          <h2
            className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200"
          >
            {product.title}
          </h2>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-indigo-600">₦{product.price.toLocaleString()}</span>
            <div className="mt-3">
              <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
            </div>
            <motion.button
              onClick={addToCart}
              disabled={posted}
              className="btn-primary my-3 w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </motion.button>
          </div>
        </Link>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
          >
            <span className="text-sm font-semibold text-gray-800">In Stock: {product.inStock}</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-5 left-5 bg-green-100 text-green-500 px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <Check size={20} className="mr-2" />
            Product added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};