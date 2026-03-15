"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";

// Google Client ID — dedicated PowerBug project in Google Cloud
const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "1082109976096-k4hf61i1j88p6793rb87j89snvcc11da.apps.googleusercontent.com";

const STORE = "powerbug";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            nonce?: string;
          }) => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              width?: number;
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill";
              logo_alignment?: "left" | "center";
              locale?: string;
            }
          ) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

async function generateNonce() {
  const raw = crypto.randomUUID();
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw)
  );
  const hashed = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return { raw, hashed };
}

async function ensureStoreTag(
  supabase: ReturnType<typeof createBrowserClient>,
  userId: string
) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("stores")
    .eq("id", userId)
    .single();

  const stores: string[] = profile?.stores ?? [];
  if (!stores.includes(STORE)) {
    await supabase
      .from("profiles")
      .upsert({ id: userId, stores: [...stores, STORE] }, { onConflict: "id" });
  }
}

export function GoogleSignInButton({
  redirectTo = "/compte",
  text = "continue_with",
}: {
  redirectTo?: string;
  text?: "signin_with" | "signup_with" | "continue_with";
}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const nonceRef = useRef<string>("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.google?.accounts?.id) {
      setReady(true);
      return;
    }

    const existing = document.getElementById("gsi-script");
    if (existing) {
      const check = setInterval(() => {
        if (window.google?.accounts?.id) {
          setReady(true);
          clearInterval(check);
        }
      }, 100);
      return () => clearInterval(check);
    }

    const script = document.createElement("script");
    script.id = "gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setReady(true);
    script.onerror = () => setError("Impossible de charger Google Sign-In.");
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current || !window.google) return;

    async function init() {
      const nonce = await generateNonce();
      nonceRef.current = nonce.raw;

      window.google!.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        nonce: nonce.hashed,
        callback: async (response) => {
          setError("");

          const supabase = createBrowserClient();
          const { data, error: authError } =
            await supabase.auth.signInWithIdToken({
              provider: "google",
              token: response.credential,
              nonce: nonceRef.current,
            });

          if (authError) {
            console.error("Google signInWithIdToken error:", authError);
            setError("Erreur de connexion Google. Reessayez.");
            return;
          }

          if (data.user) {
            await ensureStoreTag(supabase, data.user.id);
          }

          router.push(redirectTo);
          router.refresh();
        },
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        window.google!.accounts.id.renderButton(containerRef.current, {
          theme: "outline",
          size: "large",
          width: Math.min(containerRef.current.offsetWidth || 400, 400),
          text,
          shape: "rectangular",
          locale: "fr",
        });
      }
    }

    init();
  }, [ready, redirectTo, text, router]);

  return (
    <div>
      <div
        ref={containerRef}
        className="flex min-h-[44px] items-center justify-center"
      />
      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
