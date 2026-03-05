import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product-page";
import { accessories } from "@/lib/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = accessories.find((a) => a.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} - Accessoire PowerBug`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return accessories.map((a) => ({ slug: a.slug }));
}

export default async function AccessoirePage({ params }: Props) {
  const { slug } = await params;
  const product = accessories.find((a) => a.slug === slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}
