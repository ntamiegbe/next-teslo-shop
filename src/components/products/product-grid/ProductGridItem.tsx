'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Check, Plus } from 'lucide-react';

import { QuantitySelector } from "@/components";
import { useCartStore } from '@/store';
import type { CartProduct, Product } from '@/interfaces';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
}

export default function ProductGridItem({ product }: Props) {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

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
      <div
        className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-white p-2"
      >
        <div className="relative">
          <Link href={`/product/${product.id}`}>
            <Image
              src={displayImage}
              alt={product.title}
              className="w-full h-[300px] object-cover"
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
                    width={100}
                    height={100}
                    className="w-full h-20 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Link
          href={`/product/${product.id}`}
          className="text-xl font-semibold text-[#1e186f] transition-colors duration-200 !mt-10 hover:underline"
        >
          {product.title}
        </Link>
        <p className="text-md text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-4">
          <span className="text-2xl font-bold text-[#1e186f]">₦{product.price.toLocaleString()}</span>
          <div className="mt-3">
            <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
          </div>
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
        </div>

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