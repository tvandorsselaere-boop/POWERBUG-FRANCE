import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowerBug France | Chariots Électriques de Golf Premium — Bientôt Disponible",
  description:
    "Le chariot électrique de golf PowerBug arrive en France. Plus de 20 ans de qualité britannique, 8400+ avis clients. Inscrivez-vous pour être informé du lancement.",
  openGraph: {
    title: "PowerBug France | Chariots Électriques de Golf Premium",
    description:
      "Le chariot électrique de golf PowerBug arrive en France. Plus de 20 ans de qualité britannique, 8400+ avis clients.",
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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
