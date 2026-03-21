import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAccessories, getBatteries } from "@/lib/supabase/queries";
import { ProductPageDb } from "@/components/product-page-db";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} - Accessoire PowerBug`,
    description: product.seo_description ?? product.description,
    alternates: { canonical: `/accessoires/${slug}` },
  };
}

export async function generateStaticParams() {
  const [accessories, batteries] = await Promise.all([
    getAccessories(),
    getBatteries(),
  ]);
  return [...accessories, ...batteries].map((a) => ({ slug: a.slug }));
}

export default async function AccessoirePage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductPageDb product={product} />;
}
