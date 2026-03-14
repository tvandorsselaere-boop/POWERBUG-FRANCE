"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useAuth } from "@/hooks/use-auth";

function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const supabase = createBrowserClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: true,
      },
    });
    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error("OAuth error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm font-medium text-[#0F0F10] transition-colors hover:bg-[#F5F5F5] disabled:opacity-50"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      {loading ? "Redirection..." : "Continuer avec Google"}
    </button>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/compte";
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    const { error } = await signIn(email, password);
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

  return (
    <div className="mt-8 space-y-5">
      <GoogleButton />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#DBDBDB]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-[#6B7280]">ou</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div>
          <label
            htmlFor="login-email"
            className="mb-1 block text-sm font-medium text-[#0F0F10]"
          >
            Email
          </label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="votre@email.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="mb-1 block text-sm font-medium text-[#0F0F10]"
          >
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass + " pr-10"}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full btn-glass rounded-[10px] text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-[#6B7280]">
        Pas encore de compte ?{" "}
        <Link
          href="/inscription"
          className="font-medium text-[#356B0D] hover:underline"
        >
          Creer un compte
        </Link>
      </p>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Connexion</span>
      </nav>

      <div className="mx-auto max-w-md">
        <h1 className="text-center text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Connexion
        </h1>
        <p className="mt-3 text-center text-lg text-[#6B7280]">
          Connectez-vous pour suivre vos commandes.
        </p>
        <Suspense
          fallback={
            <p className="mt-8 text-center text-[#6B7280]">Chargement...</p>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="mt-8 text-center text-xs text-[#6B7280]">
          En vous connectant, vous acceptez nos{" "}
          <Link href="/cgv" className="underline hover:text-[#356B0D]">
            conditions generales de vente
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
