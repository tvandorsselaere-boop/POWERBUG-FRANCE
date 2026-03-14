"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/browser";

type Tab = "connexion" | "inscription";

export default function ConnexionPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("connexion");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);

  const supabase = createBrowserClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!loginEmail || !loginPassword) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : authError.message
      );
      setLoading(false);
      return;
    }

    router.push("/");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!signupEmail || !signupPassword || !signupConfirm) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caracteres.");
      setLoading(false);
      return;
    }

    if (signupPassword !== signupConfirm) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "Compte cree avec succes ! Verifiez votre email pour confirmer votre inscription."
    );
    setLoading(false);
  }

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

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
          Mon compte
        </h1>
        <p className="mt-3 text-center text-lg text-[#6B7280]">
          Connectez-vous ou creez un compte pour suivre vos commandes.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex rounded-[10px] border border-[#DBDBDB] bg-[#F5F5F5] p-1">
          <button
            type="button"
            onClick={() => {
              setTab("connexion");
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 rounded-[8px] py-2.5 text-sm font-medium transition-colors ${
              tab === "connexion"
                ? "bg-white text-[#0F0F10] shadow-sm"
                : "text-[#6B7280] hover:text-[#0F0F10]"
            }`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("inscription");
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 rounded-[8px] py-2.5 text-sm font-medium transition-colors ${
              tab === "inscription"
                ? "bg-white text-[#0F0F10] shadow-sm"
                : "text-[#6B7280] hover:text-[#0F0F10]"
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Error / Success messages */}
        {error && (
          <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Login form */}
        {tab === "connexion" && (
          <form onSubmit={handleLogin} className="mt-6 space-y-5">
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
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
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
                  type={showLoginPassword ? "text" : "password"}
                  id="login-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={inputClass + " pr-10"}
                  placeholder="Votre mot de passe"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  tabIndex={-1}
                >
                  {showLoginPassword ? (
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
        )}

        {/* Signup form */}
        {tab === "inscription" && (
          <form onSubmit={handleSignup} className="mt-6 space-y-5">
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
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
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
                  type={showSignupPassword ? "text" : "password"}
                  id="signup-password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className={inputClass + " pr-10"}
                  placeholder="Minimum 6 caracteres"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  tabIndex={-1}
                >
                  {showSignupPassword ? (
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
                  type={showSignupConfirm ? "text" : "password"}
                  id="signup-confirm"
                  value={signupConfirm}
                  onChange={(e) => setSignupConfirm(e.target.value)}
                  className={inputClass + " pr-10"}
                  placeholder="Retapez votre mot de passe"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignupConfirm(!showSignupConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  tabIndex={-1}
                >
                  {showSignupConfirm ? (
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
        )}

        <p className="mt-6 text-center text-xs text-[#6B7280]">
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
