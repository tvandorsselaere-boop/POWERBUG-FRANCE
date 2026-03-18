"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { GoogleSignInButton } from "@/components/google-sign-in";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/compte";
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetLoading(true);

    if (!email) {
      setError("Veuillez saisir votre adresse email.");
      setResetLoading(false);
      return;
    }

    const { error } = await resetPassword(email);
    if (error) {
      setError(error.message);
      setResetLoading(false);
      return;
    }

    setResetSent(true);
    setResetLoading(false);
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

  if (forgotMode && resetSent) {
    return (
      <div className="mt-8 text-center">
        <div className="rounded-[10px] border border-green-200 bg-green-50 px-4 py-5 text-sm text-green-800">
          <p className="font-medium">Email envoye !</p>
          <p className="mt-1">
            Si un compte existe avec <span className="font-medium">{email}</span>,
            vous recevrez un lien pour reinitialiser votre mot de passe.
          </p>
        </div>
        <button
          onClick={() => { setForgotMode(false); setResetSent(false); setError(""); }}
          className="mt-4 text-sm font-medium text-[#356B0D] hover:underline"
        >
          Retour a la connexion
        </button>
      </div>
    );
  }

  if (forgotMode) {
    return (
      <div className="mt-8 space-y-5">
        <form onSubmit={handleResetPassword} className="space-y-5">
          {error && (
            <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="reset-email"
              className="mb-1 block text-sm font-medium text-[#0F0F10]"
            >
              Votre adresse email
            </label>
            <input
              type="email"
              id="reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="votre@email.com"
              autoComplete="email"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={resetLoading}
            className="w-full btn-glass rounded-[10px] text-white"
          >
            {resetLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer le lien de reinitialisation"
            )}
          </Button>
        </form>

        <button
          onClick={() => { setForgotMode(false); setError(""); }}
          className="block w-full text-center text-sm font-medium text-[#356B0D] hover:underline"
        >
          Retour a la connexion
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      <GoogleSignInButton redirectTo={redirect} text="continue_with" />

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
          <button
            type="button"
            onClick={() => { setForgotMode(true); setError(""); }}
            className="mt-1.5 text-sm text-[#356B0D] hover:underline"
          >
            Mot de passe oublie ?
          </button>
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
