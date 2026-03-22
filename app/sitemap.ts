import type { MetadataRoute } from "next";
import { features } from "@/lib/data/features";
import { getAccessories, getBatteries, getPiecesDetachees } from "@/lib/supabase/queries";

const BASE_URL = "https://www.powerbug.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const featureUrls: MetadataRoute.Sitemap = features.map((f) => ({
    url: `${BASE_URL}/fonctionnalites/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Fetch dynamic product slugs from Supabase
  const [accessories, batteries, pieces] = await Promise.all([
    getAccessories(),
    getBatteries(),
    getPiecesDetachees(),
  ]);

  const accessoryUrls: MetadataRoute.Sitemap = [...accessories, ...batteries].map((p) => ({
    url: `${BASE_URL}/accessoires/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const piecesUrls: MetadataRoute.Sitemap = pieces.map((p) => ({
    url: `${BASE_URL}/pieces-detachees/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    // Pages principales
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/trolleys`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/trolleys/nx-lithium`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/trolleys/nx-dhc-lithium`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/accessoires`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pieces-detachees`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // Produits dynamiques (accessoires, batteries, pièces)
    ...accessoryUrls,
    ...piecesUrls,
    // Fonctionnalités (dynamique)
    ...featureUrls,
    // Contenu & marque
    { url: `${BASE_URL}/notre-histoire`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/avis`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/garantie`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/livraison`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    // Légales
    { url: `${BASE_URL}/cgv`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/politique-retour`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/politique-confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
