import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConstructionBanner } from "@/components/construction-banner";
import { TrustBanner } from "@/components/trust-banner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.powerbug.fr"),
  title: {
    default: "PowerBug France | Chariots Electriques de Golf Premium",
    template: "%s | PowerBug France",
  },
  description:
    "Distributeur exclusif France des chariots electriques de golf PowerBug. NX Lithium et NX DHC Lithium, accessoires, batteries. Livraison France entiere.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PowerBug France | Chariots Electriques de Golf Premium",
    description:
      "Distributeur exclusif France des chariots electriques de golf PowerBug. Qualite britannique depuis 2003.",
    type: "website",
    locale: "fr_FR",
    siteName: "PowerBug France",
    url: "https://www.powerbug.fr",
  },
  verification: {
    google: "jysyw4S7gFnMSHyidOa5uAsCTRQM8z-BnQ-G4lDFZKc",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerBug France | Chariots Électriques de Golf Premium",
    description: "Distributeur exclusif France des chariots électriques de golf PowerBug. Qualité britannique, livraison France entière.",
  },
  icons: {
    icon: "/images/logo/powerbug-logo-hd.png",
    apple: "/images/logo/powerbug-logo-hd.png",
  },
};

const schemaWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PowerBug France",
  url: "https://www.powerbug.fr",
  description: "Distributeur exclusif France des chariots électriques de golf PowerBug",
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PowerBug France",
  url: "https://www.powerbug.fr",
  description: "Distributeur exclusif France des chariots électriques de golf PowerBug depuis 2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33788239784",
    contactType: "customer service",
    availableLanguage: "French",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} antialiased bg-white text-[#0F0F10]`}>
        <ConstructionBanner />
        <Header />
        <TrustBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebsite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }} />
        <GoogleAnalytics gaId="G-VEKW0YYE2L" />
      </body>
    </html>
  );
}
