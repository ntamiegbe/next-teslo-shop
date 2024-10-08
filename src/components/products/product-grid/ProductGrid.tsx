import { Product } from '@/interfaces';
import ProductGridItem from './ProductGridItem';

interface Props {
  products: Product[];
}

export const ProductGrid = ( { products }: Props ) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 lg:px-10 mb-10">
      {
        products.map( product => (
          <ProductGridItem
            key={ product.slug }
            product={ product }
          />
        ) )
      }

    </div>
  );
};