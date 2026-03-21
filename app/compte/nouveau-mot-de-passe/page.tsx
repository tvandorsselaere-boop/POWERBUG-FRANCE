"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function NouveauMotDePassePage() {
  const router = useRouter();
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: import('@supabase/supabase-js').User | null } }) => {
      if (user?.email) setUserEmail(user.email);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!password || !confirmPassword) {
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

    const { error } = await updatePassword(password);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Delay so Chrome can detect the new password and offer to save it
    setTimeout(() => setSuccess(true), 500);
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
          <span className="text-[#0F0F10]">Nouveau mot de passe</span>
        </nav>

        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            Mot de passe modifie
          </h1>
          <p className="mt-4 text-[#6B7280]">
            Votre mot de passe a ete mis a jour avec succes.
          </p>
          <Button
            onClick={() => router.push("/compte")}
            className="mt-8 btn-glass rounded-[10px] text-white"
          >
            Acceder a mon compte
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Nouveau mot de passe</span>
      </nav>

      <div className="mx-auto max-w-md">
        <h1 className="text-center text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Nouveau mot de passe
        </h1>
        <p className="mt-3 text-center text-lg text-[#6B7280]">
          Choisissez votre nouveau mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Hidden username field for Chrome password manager */}
          <input type="hidden" autoComplete="username" value={userEmail} readOnly />
          {error && (
            <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="new-password"
              className="mb-1 block text-sm font-medium text-[#0F0F10]"
            >
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="new-password"
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
              htmlFor="confirm-password"
              className="mb-1 block text-sm font-medium text-[#0F0F10]"
            >
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirm-password"
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
                Mise a jour...
              </>
            ) : (
              "Mettre a jour mon mot de passe"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
