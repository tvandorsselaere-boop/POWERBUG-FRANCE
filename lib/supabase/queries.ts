import { createClient as createPlainClient } from "@supabase/supabase-js";

/** Public read-only client — no cookies needed, safe for build-time (generateStaticParams) */
function createQueryClient() {
  return createPlainClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type DbProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  specs: Record<string, string> | null;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  featured: boolean;
  category: {
    name: string;
    slug: string;
  } | null;
  brand: {
    name: string;
    slug: string;
  } | null;
  product_variants: {
    id: string;
    price: number;
    compare_at_price: number | null;
    stock_quantity: number;
    stock_status: string;
    sku: string | null;
  }[];
  product_images: {
    url: string;
    alt_text: string | null;
    position: number;
    is_primary: boolean;
  }[];
};

const PRODUCT_SELECT = `
  id, name, slug, description, base_price, specs,
  seo_title, seo_description, is_active, featured,
  category:categories(name, slug),
  brand:brands(name, slug),
  product_variants(id, price, compare_at_price, stock_quantity, stock_status, sku),
  product_images(url, alt_text, position, is_primary)
`;

export async function getProducts(categorySlug?: string) {
  const supabase = createQueryClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("store", "powerbug")
    .eq("is_active", true)
    .order("base_price", { ascending: false });

  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return ((data ?? []) as unknown as DbProduct[]);
}

export async function getProductBySlug(slug: string) {
  const supabase = createQueryClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("store", "powerbug")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data as unknown as DbProduct;
}

export async function getTrolleys() {
  const supabase = createQueryClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("store", "powerbug")
    .eq("is_active", true)
    .eq("categories.slug", "chariots-electriques")
    .order("base_price", { ascending: true });

  if (error) {
    console.error("Error fetching trolleys:", error);
    return [];
  }
  // Filter out products where category is null (join didn't match)
  return ((data ?? []) as unknown as DbProduct[]).filter((p) => p.category);
}

export async function getAccessories() {
  const supabase = createQueryClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("store", "powerbug")
    .eq("is_active", true)
    .in("categories.slug", ["accessoires-trolley", "pieces-detachees", "telemetres"])
    .order("base_price", { ascending: true });

  if (error) {
    console.error("Error fetching accessories:", error);
    return [];
  }
  return ((data ?? []) as unknown as DbProduct[]).filter((p) => p.category);
}

export async function getBatteries() {
  const supabase = createQueryClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("store", "powerbug")
    .eq("is_active", true)
    .eq("categories.slug", "batteries")
    .order("base_price", { ascending: false });

  if (error) {
    console.error("Error fetching batteries:", error);
    return [];
  }
  return ((data ?? []) as unknown as DbProduct[]).filter((p) => p.category);
}
