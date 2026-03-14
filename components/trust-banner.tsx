import { Shield, Star, Truck, Headphones } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Garantie 2 ans" },
  { icon: Star, label: "8 000+ avis clients" },
  { icon: Truck, label: "Livraison France 15\u20AC" },
  { icon: Headphones, label: "SAV reactif" },
];

export function TrustBanner() {
  return (
    <div className="border-y border-[#DBDBDB] bg-[#F5F5F5]">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-6 px-6 py-3 sm:gap-10 lg:px-10">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 text-sm text-[#0F0F10]"
          >
            <item.icon className="h-4 w-4 text-[#356B0D]" />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
