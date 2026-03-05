import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact - PowerBug France",
  description:
    "Contactez le distributeur exclusif PowerBug en France. Questions, SAV, garantie.",
};

export default function ContactPage() {
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

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="mb-1 block text-sm font-medium text-[#0F0F10]">
                  Prenom
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]"
                  placeholder="Votre prenom"
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
                  className="w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]"
                  placeholder="Votre nom"
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
                className="w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Sujet
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]"
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
                className="w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]"
                placeholder="Votre message..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-[10px] bg-[#356B0D] text-white hover:bg-[#2a5509] sm:w-auto"
            >
              Envoyer le message
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
                  <p className="text-sm text-[#6B7280]">contact@powerbug-france.fr</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
                <div>
                  <p className="text-sm font-medium text-[#0F0F10]">Telephone</p>
                  <p className="text-sm text-[#6B7280]">A venir</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
                <div>
                  <p className="text-sm font-medium text-[#0F0F10]">Adresse</p>
                  <p className="text-sm text-[#6B7280]">France metropolitaine</p>
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
