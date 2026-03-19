import Link from "next/link";
import { Home, ShoppingBag, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1600px] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-6xl font-bold text-[#356B0D]">404</p>
      <h1 className="mt-4 text-2xl font-bold text-[#0F0F10] sm:text-3xl">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-[#6B7280]">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-[10px] bg-[#356B0D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a5609]"
        >
          <Home className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/trolleys"
          className="inline-flex items-center gap-2 rounded-[10px] border border-[#DBDBDB] bg-white px-6 py-3 text-sm font-semibold text-[#0F0F10] transition-colors hover:bg-[#F5F5F5]"
        >
          <ShoppingBag className="h-4 w-4" />
          Voir les chariots
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-[10px] border border-[#DBDBDB] bg-white px-6 py-3 text-sm font-semibold text-[#0F0F10] transition-colors hover:bg-[#F5F5F5]"
        >
          <Phone className="h-4 w-4" />
          Nous contacter
        </Link>
      </div>
    </div>
  );
}
