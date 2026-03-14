import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - PowerBug France",
  description:
    "Connectez-vous ou creez un compte PowerBug France pour suivre vos commandes.",
};

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
