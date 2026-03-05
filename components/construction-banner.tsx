import { Construction } from "lucide-react";

export function ConstructionBanner() {
  return (
    <div className="bg-[#F6A429] py-2 text-center text-sm font-medium text-[#0F0F10]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-2 px-4">
        <Construction className="h-4 w-4" />
        <span>Site en construction — Ouverture prochainement</span>
      </div>
    </div>
  );
}
