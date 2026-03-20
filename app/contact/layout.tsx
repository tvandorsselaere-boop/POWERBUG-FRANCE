import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - PowerBug France",
  description:
    "Contactez le distributeur exclusif PowerBug en France. Questions, SAV, garantie.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
