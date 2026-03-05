import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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
  title: {
    default: "PowerBug France | Chariots Electriques de Golf Premium",
    template: "%s | PowerBug France",
  },
  description:
    "Distributeur exclusif France des chariots electriques de golf PowerBug. NX Lithium et NX DHC Lithium, accessoires, batteries. Livraison France entiere.",
  openGraph: {
    title: "PowerBug France | Chariots Electriques de Golf Premium",
    description:
      "Distributeur exclusif France des chariots electriques de golf PowerBug. Plus de 20 ans de qualite britannique.",
    type: "website",
    locale: "fr_FR",
    siteName: "PowerBug France",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
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
      </body>
    </html>
  );
}
