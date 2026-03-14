import { Construction, Mail, Phone } from "lucide-react";

export function ConstructionBanner() {
  return (
    <div className="bg-[#F6A429] py-2 text-center text-sm font-medium text-[#0F0F10]">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4">
        <div className="flex items-center gap-2">
          <Construction className="h-4 w-4" />
          <span>Site en cours de lancement — Commandez des maintenant</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="mailto:contact@powerbug.fr" className="inline-flex items-center gap-1 underline hover:no-underline">
            <Mail className="h-3.5 w-3.5" />
            contact@powerbug.fr
          </a>
          <a href="tel:+33967876795" className="inline-flex items-center gap-1 underline hover:no-underline">
            <Phone className="h-3.5 w-3.5" />
            09 67 87 67 95
          </a>
        </div>
      </div>
    </div>
  );
}
