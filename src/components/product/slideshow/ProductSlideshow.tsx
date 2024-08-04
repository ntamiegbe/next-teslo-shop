'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { Product } from "@/interfaces";
import { motion } from 'framer-motion';

interface Props {
  products: Product[];
  className?: string;
}

export const ProductSlideshow = ({ products, className }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <div className={`${className} relative w-full overflow-hidden`}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {products.map((product, productIndex) => (
            <div key={product.id} className="embla__slide relative w-full h-[50vh] lg:h-[80vh]">
              <Image
                src={product.images[0]}
                alt={`${product.title}`}
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {product.title}
                </motion.h2>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-8 line-clamp-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {product.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link href={`/product/${product.id}`} passHref>
                    <span className="bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition duration-300 cursor-pointer">
                      View Details
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-50'
              }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};