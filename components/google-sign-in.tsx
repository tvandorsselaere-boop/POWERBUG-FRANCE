"use client";

import { useEffect, useRef, useState } from "react";
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

function isMobile() {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function GoogleSignInButton({
  redirectTo = "/compte",
  text = "continue_with",
}: {
  redirectTo?: string;
  text?: "signin_with" | "signup_with" | "continue_with";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nonceRef = useRef<string>("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  // Desktop: load Google Identity Services script
  useEffect(() => {
    if (mobile) return;

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
  }, [mobile]);

  // Desktop: render Google button
  useEffect(() => {
    if (mobile || !ready || !containerRef.current || !window.google) return;

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

          window.location.href = redirectTo;
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
  }, [mobile, ready, redirectTo, text]);

  // Mobile: use Supabase OAuth redirect (no popup, no origin issues)
  const handleMobileGoogle = async () => {
    setLoading(true);
    setError("");
    const supabase = createBrowserClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
    if (oauthError) {
      setError("Erreur de connexion Google. Reessayez.");
      setLoading(false);
    }
  };

  // Mobile: render our own styled button
  if (mobile) {
    return (
      <div>
        <button
          onClick={handleMobileGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm font-medium text-[#0F0F10] transition-colors hover:bg-[#F5F5F5]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading ? "Redirection..." : text === "signup_with" ? "S'inscrire avec Google" : "Continuer avec Google"}
        </button>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  // Desktop: render Google Identity Services button
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
