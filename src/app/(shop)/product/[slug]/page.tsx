export const revalidate = 604800; //7 días
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
} from "@/components";
import { AddToCart } from './ui/AddToCart';
import { products } from "../../../../../data";
import Image from "next/image";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const product = products.find((product) => product.id === slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = products.find((product) => product.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-2 gap-3">
      <Image
        src={product.images[0]}
        alt={product.title}
        width={500}
        height={300}
        className="rounded-md h-[450px] w-full"
      />
      <div className="col-span-1 px-5">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
        {product.images[1] && (
          <div className="flex items-center space-x-4 mt-14">
            <Image
              src={product.images[1]}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-md w-48 h-48"
            />
            <Image
              src={product.images[2]}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-md w-48 h-48"
            />
          </div>
        )}
      </div>
    </div>
  );
}
