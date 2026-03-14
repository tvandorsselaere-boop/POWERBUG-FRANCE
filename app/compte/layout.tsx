import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mon compte - PowerBug France",
  description: "Gerez votre compte PowerBug France, vos commandes et vos adresses.",
};

export default async function CompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  return <>{children}</>;
}
