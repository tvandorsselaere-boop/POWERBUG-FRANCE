"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const items = useCartStore((s) => s.items);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erreur lors du checkout");
        setLoading(false);
      }
    } catch {
      alert("Erreur de connexion");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className="w-full rounded-[10px] bg-[#356B0D] text-white hover:bg-[#2a5509]"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Redirection...
        </>
      ) : (
        "Passer la commande"
      )}
    </Button>
  );
}
