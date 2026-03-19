import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  produits: [
    { name: "NX Lithium", href: "/trolleys/nx-lithium" },
    { name: "NX DHC Lithium", href: "/trolleys/nx-dhc-lithium" },
    { name: "Accessoires", href: "/accessoires" },
    { name: "Batteries", href: "/batteries" },
    { name: "Pieces detachees", href: "/pieces-detachees" },
  ],
  informations: [
    { name: "Notre histoire", href: "/notre-histoire" },
    { name: "Avis & Tests", href: "/avis" },
    { name: "Garantie", href: "/garantie" },
    { name: "FAQ", href: "/faq" },
    { name: "Livraison", href: "/livraison" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "CGV", href: "/cgv" },
    { name: "Mentions legales", href: "/mentions-legales" },
    { name: "Politique de retour", href: "/politique-retour" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[#DBDBDB] bg-[#F5F5F5]">
      <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#356B0D]" />
              <span className="text-xl font-semibold tracking-tight text-[#0F0F10]">
                POWER<span className="font-bold">BUG</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Distributeur exclusif France des chariots electriques de golf PowerBug.
              Qualite britannique depuis 2003.
            </p>
          </div>

          {/* Produits */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0F0F10]">
              Produits
            </h3>
            <ul className="space-y-2">
              {footerLinks.produits.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7280] transition-colors hover:text-[#356B0D]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0F0F10]">
              Informations
            </h3>
            <ul className="space-y-2">
              {footerLinks.informations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7280] transition-colors hover:text-[#356B0D]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0F0F10]">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7280] transition-colors hover:text-[#356B0D]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-[#DBDBDB] pt-6 text-center text-xs text-[#6B7280]">
          <p>&copy; {new Date().getFullYear()} PowerBug France. Tous droits reserves.</p>
          <p className="mt-1">
            PRO GOLF DISTRIBUTION SASU — SIREN 888 311 610 — TVA FR 07 888 311 610 | Site realise par{" "}
            <a
              href="https://facile-ia.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#356B0D] transition-colors hover:underline"
            >
              Facile-IA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
