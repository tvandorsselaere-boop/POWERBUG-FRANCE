import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - PowerBug France",
  description:
    "Creez votre compte PowerBug France pour suivre vos commandes et gerer vos adresses.",
};

export default function InscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
