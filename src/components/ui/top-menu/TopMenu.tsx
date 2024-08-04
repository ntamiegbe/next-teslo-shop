"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store";

export const TopMenu = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  
  return (
    <nav className="flex px-5 py-10 fixed top-0 z-50 bg-white drop-shadow border-b justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className } antialiased font-bold text-lg`}>
            Summit
          </span>
          <span> | AutoTech</span>
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-7 h-7" />
        </Link>

        <Link href={
          ( (totalItemsInCart === 0 ) && loaded )
            ? '/empty'
            : "/cart"
        } className="mx-2">
          <div className="relative">
            {  ( loaded && totalItemsInCart > 0) && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-7 h-7" />
          </div>
        </Link>
      </div>
    </nav>
  );
};
