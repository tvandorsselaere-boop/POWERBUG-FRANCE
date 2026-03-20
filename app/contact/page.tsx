"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname, lastname, email, subject, message,
          website: (document.getElementById("website") as HTMLInputElement)?.value ?? "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Une erreur est survenue. Veuillez reessayer.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFirstname("");
      setLastname("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
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
        <span className="text-[#0F0F10]">Contact</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Form */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            Contactez-nous
          </h1>
          <p className="mt-3 text-lg text-[#6B7280]">
            Une question sur nos produits, le SAV ou la garantie ? Nous vous
            repondons sous 24h.
          </p>

          {/* Success message */}
          {success && (
            <div className="mt-6 flex items-start gap-3 rounded-[10px] border border-green-200 bg-green-50 px-4 py-3">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Message envoye avec succes !
                </p>
                <p className="mt-1 text-sm text-green-700">
                  Nous vous repondrons sous 24h ouvrees.
                </p>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="mb-1 block text-sm font-medium text-[#0F0F10]">
                  Prenom
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className={inputClass}
                  placeholder="Votre prenom"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastname" className="mb-1 block text-sm font-medium text-[#0F0F10]">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className={inputClass}
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Sujet
              </label>
              <select
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Choisir un sujet</option>
                <option value="produit">Question sur un produit</option>
                <option value="commande">Suivi de commande</option>
                <option value="sav">SAV / Garantie</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass}
                placeholder="Votre message..."
                required
              />
            </div>

            {/* Honeypot anti-bot — hidden from real users */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Ne pas remplir</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full btn-glass rounded-[10px] text-white sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer le message"
              )}
            </Button>
          </form>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="space-y-8 rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
            <div>
              <h2 className="text-xl font-bold text-[#0F0F10]">PowerBug France</h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Distributeur exclusif France
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
                <div>
                  <p className="text-sm font-medium text-[#0F0F10]">Email</p>
                  <a href="mailto:fred@powerbug.fr" className="text-sm text-[#6B7280] hover:text-[#356B0D]">fred@powerbug.fr</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
                <div>
                  <p className="text-sm font-medium text-[#0F0F10]">Telephone</p>
                  <a href="tel:+33788239784" className="text-sm text-[#6B7280] hover:text-[#356B0D]">07 88 23 97 84</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
                <div>
                  <p className="text-sm font-medium text-[#0F0F10]">Adresse</p>
                  <p className="text-sm text-[#6B7280]">Domaine de Riquetti, 13290 Aix-en-Provence</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#DBDBDB] pt-6">
              <p className="text-sm text-[#6B7280]">
                <strong className="text-[#0F0F10]">Delai de reponse :</strong>{" "}
                Nous repondons a toutes les demandes sous 24h ouvrees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
