"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { GoogleSignInButton } from "@/components/google-sign-in";

export default function InscriptionPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

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

    // Redirection directe — pas de confirmation email
    router.push("/compte");
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
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
          <GoogleSignInButton redirectTo="/compte" text="signup_with" />

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
