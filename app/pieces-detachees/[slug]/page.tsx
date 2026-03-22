import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getPiecesDetachees } from "@/lib/supabase/queries";
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
    title: `${product.name} - Pièce détachée PowerBug`,
    description: product.seo_description ?? product.description,
    alternates: { canonical: `/pieces-detachees/${slug}` },
  };
}

export async function generateStaticParams() {
  const pieces = await getPiecesDetachees();
  return pieces.map((p) => ({ slug: p.slug }));
}

export default async function PieceDetacheePage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductPageDb product={product} />;
}
