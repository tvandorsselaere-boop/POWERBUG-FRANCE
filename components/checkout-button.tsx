"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useAuth } from "@/hooks/use-auth";
import { createBrowserClient } from "@/lib/supabase/browser";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const items = useCartStore((s) => s.items);
  const { user } = useAuth();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      let email: string | undefined;
      let shippingAddress: Record<string, string> | undefined;

      if (user) {
        email = user.email;
        const supabase = createBrowserClient();
        const { data } = await supabase
          .from("profiles")
          .select("default_shipping_address")
          .eq("id", user.id)
          .single();
        if (data?.default_shipping_address) {
          shippingAddress = data.default_shipping_address as Record<string, string>;
        }
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email, shippingAddress }),
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
      className="w-full btn-glass rounded-[10px] text-white"
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
