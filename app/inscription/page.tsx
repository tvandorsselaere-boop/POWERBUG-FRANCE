"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useAuth } from "@/hooks/use-auth";

function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const supabase = createBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
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
      {loading ? "Redirection..." : "S'inscrire avec Google"}
    </button>
  );
}

export default function InscriptionPage() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caracteres.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

  if (success) {
    return (
      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#356B0D]">
            Accueil
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#0F0F10]">Inscription</span>
        </nav>

        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            Verifiez votre email
          </h1>
          <p className="mt-4 text-[#6B7280]">
            Un email de confirmation a ete envoye a{" "}
            <span className="font-medium text-[#0F0F10]">{email}</span>.
            Cliquez sur le lien pour activer votre compte.
          </p>
          <Link href="/connexion">
            <Button className="mt-8 btn-glass rounded-[10px] text-white">
              Retour a la connexion
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Inscription</span>
      </nav>

      <div className="mx-auto max-w-md">
        <h1 className="text-center text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Creer un compte
        </h1>
        <p className="mt-3 text-center text-lg text-[#6B7280]">
          Inscrivez-vous pour suivre vos commandes et gerer vos adresses.
        </p>

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
                htmlFor="signup-name"
                className="mb-1 block text-sm font-medium text-[#0F0F10]"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="signup-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
                placeholder="Jean Dupont"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="mb-1 block text-sm font-medium text-[#0F0F10]"
              >
                Email
              </label>
              <input
                type="email"
                id="signup-email"
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
                htmlFor="signup-password"
                className="mb-1 block text-sm font-medium text-[#0F0F10]"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass + " pr-10"}
                  placeholder="Minimum 6 caracteres"
                  autoComplete="new-password"
                  required
                  minLength={6}
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

            <div>
              <label
                htmlFor="signup-confirm"
                className="mb-1 block text-sm font-medium text-[#0F0F10]"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="signup-confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass + " pr-10"}
                  placeholder="Retapez votre mot de passe"
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  tabIndex={-1}
                >
                  {showConfirm ? (
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
                  Inscription en cours...
                </>
              ) : (
                "Creer mon compte"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-[#6B7280]">
            Deja un compte ?{" "}
            <Link
              href="/connexion"
              className="font-medium text-[#356B0D] hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-[#6B7280]">
          En creant un compte, vous acceptez nos{" "}
          <Link href="/cgv" className="underline hover:text-[#356B0D]">
            conditions generales de vente
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
