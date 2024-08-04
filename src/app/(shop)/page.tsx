import { ProductGrid, ProductMobileSlideshow, ProductSlideshow, Title } from '@/components';
import { products } from '../../../data';

export default async function Home() {

  return (
    <div className=''>
      {/* <Title
        title="Summit Auto Tech"
        subtitle="Dealers on all kinds of car accessories and spare parts. Free delivery on all orders within Abuja. Call us on 08012345678 for more information."
        className="mb-2"
      /> */}

      <ProductSlideshow products={products} />

      <div className="my-10">
        <ProductGrid
          products={products}
        />
      </div>

    </div>
  );
}
