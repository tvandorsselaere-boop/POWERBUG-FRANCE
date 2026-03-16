"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, Lock, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function ParametresPage() {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.app_metadata?.provider === "google") setIsGoogleUser(true);
    });
  }, [supabase]);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Delete account state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [delLoading, setDelLoading] = useState(false);
  const [delError, setDelError] = useState("");

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage(null);

    if (newPassword.length < 6) {
      setPwMessage({
        type: "error",
        text: "Le mot de passe doit contenir au moins 6 caracteres.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwMessage({
        type: "error",
        text: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setPwLoading(true);

    // Re-authenticate with current password
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      setPwMessage({
        type: "error",
        text: "Utilisateur non trouve.",
      });
      setPwLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      setPwMessage({
        type: "error",
        text: "Mot de passe actuel incorrect.",
      });
      setPwLoading(false);
      return;
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setPwMessage({ type: "error", text: updateError.message });
    } else {
      setPwMessage({
        type: "success",
        text: "Mot de passe modifie avec succes.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setPwLoading(false);
  };

  const deleteConfirmWord = "SUPPRIMER";

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== deleteConfirmWord) return;
    setDelLoading(true);
    setDelError("");

    const res = await fetch("/api/account/delete", { method: "POST" });

    if (!res.ok) {
      const data = await res.json();
      setDelError(data.error || "Impossible de supprimer le compte.");
      setDelLoading(false);
      return;
    }

    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/compte" className="hover:text-[#356B0D]">
          Mon compte
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Parametres</span>
      </nav>

      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Parametres
        </h1>
        <p className="mt-2 text-[#6B7280]">
          Gerez la securite de votre compte.
        </p>

        {/* Section 1 -- Change password (masqué pour comptes Google) */}
        {isGoogleUser && (
          <div className="mt-8 rounded-[10px] border border-[#DBDBDB] bg-gray-50 p-4 text-sm text-[#6B7280]">
            Vous êtes connecté via Google. La gestion du mot de passe se fait depuis votre compte Google.
          </div>
        )}
        <div className={`mt-8 ${isGoogleUser ? "hidden" : ""}`}>
          <div className="mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#356B0D]" />
            <h2 className="text-lg font-semibold text-[#0F0F10]">
              Changer le mot de passe
            </h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className={inputClass}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className={inputClass}
                autoComplete="new-password"
              />
              <p className="mt-1 text-xs text-[#9CA3AF]">
                Minimum 6 caracteres
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className={inputClass}
                autoComplete="new-password"
              />
            </div>

            {pwMessage && (
              <div
                className={`rounded-[10px] border p-3 text-sm ${
                  pwMessage.type === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {pwMessage.text}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full btn-glass rounded-[10px] text-white"
              disabled={pwLoading}
            >
              {pwLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Modification en cours...
                </>
              ) : (
                "Modifier le mot de passe"
              )}
            </Button>
          </form>
        </div>

        {/* Section 2 -- Delete account */}
        <div className="mt-10 rounded-[10px] border-2 border-red-200 p-6">
          <div className="mb-2 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold text-red-700">
              Supprimer mon compte
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#6B7280]">
            Cette action est irreversible. Toutes vos donnees seront
            definitivement supprimees.
          </p>

          {!showDeleteDialog ? (
            <Button
              variant="outline"
              className="rounded-[10px] border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowDeleteDialog(true)}
            >
              Supprimer mon compte
            </Button>
          ) : (
            <div className="space-y-3 rounded-[10px] bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                Tapez &quot;{deleteConfirmWord}&quot; pour confirmer la
                suppression :
              </p>
              <input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder={deleteConfirmWord}
                className={inputClass + " border-red-300"}
              />
              {delError && (
                <p className="text-sm text-red-600">{delError}</p>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={handleDeleteAccount}
                  disabled={
                    deleteConfirm !== deleteConfirmWord || delLoading
                  }
                  className="rounded-[10px] bg-red-600 text-white hover:bg-red-700"
                >
                  {delLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    "Confirmer la suppression"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-[10px]"
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setDeleteConfirm("");
                    setDelError("");
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/compte"
          className="mt-6 flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#356B0D]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au compte
        </Link>
      </div>
    </div>
  );
}
