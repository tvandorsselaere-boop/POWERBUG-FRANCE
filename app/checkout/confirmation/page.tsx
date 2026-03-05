"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-28 lg:px-10">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#356B0D]/10">
        <CheckCircle className="h-10 w-10 text-[#356B0D]" />
      </div>

      <h1 className="text-3xl font-bold text-[#0F0F10]">
        Merci pour votre commande !
      </h1>

      <p className="mt-4 text-lg text-[#6B7280]">
        Votre commande a bien ete enregistree. Vous recevrez un email de
        confirmation sous peu.
      </p>

      {sessionId && (
        <p className="mt-2 text-sm text-[#6B7280]">
          Reference : {sessionId.slice(0, 20)}...
        </p>
      )}

      <div className="mt-10 flex justify-center gap-4">
        <Button
          asChild
          className="rounded-[10px] bg-[#356B0D] text-white hover:bg-[#2a5509]"
        >
          <Link href="/">Retour a l&apos;accueil</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-[10px] border-[#DBDBDB] text-[#0F0F10] hover:bg-[#F5F5F5]"
        >
          <Link href="/trolleys">Continuer les achats</Link>
        </Button>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-[#6B7280]">Chargement...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
