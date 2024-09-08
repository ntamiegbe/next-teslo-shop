import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderComponent } from '../checkout/(checkout)/ui/ProductsInCart';

export default function CartPage() {

  return (
    <div className="flex justify-center items-center px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title='Cart' />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              Continue shopping
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout - Order Summary */}
            <OrderComponent />
        </div>
      </div>
    </div>
  );
}
