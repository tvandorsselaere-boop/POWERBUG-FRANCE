"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, User } from "lucide-react";
import { CartCount } from "@/components/cart-count";
import { useAuth } from "@/hooks/use-auth";

interface MobileBottomBarProps {
  onMenuOpen: () => void;
}

function TrolleyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="8" cy="20" r="2" />
      <circle cx="16" cy="20" r="2" />
      <path d="M10 20h4" />
      <path d="M12 20V8" />
      <path d="M8 8h8l1-4H7l1 4z" />
      <path d="M12 8v-4" />
    </svg>
  );
}

export function MobileBottomBar({ onMenuOpen }: MobileBottomBarProps) {
  const { user } = useAuth();

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DBDBDB] bg-white md:hidden">
      <div className="flex h-14 items-stretch">
        {/* Accueil — favicon */}
        <Link
          href="/"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#6B7280] transition-colors active:text-[#356B0D]"
        >
          <Image src="/icon-192.png" alt="PowerBug" width={22} height={22} className="h-[22px] w-[22px]" />
          <span className="text-[10px] font-medium">Accueil</span>
        </Link>

        {/* Menu burger */}
        <button
          onClick={onMenuOpen}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#6B7280] transition-colors active:text-[#356B0D]"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] font-medium">Menu</span>
        </button>

        {/* Chariots */}
        <Link
          href="/trolleys"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#6B7280] transition-colors active:text-[#356B0D]"
        >
          <TrolleyIcon className="h-5 w-5" />
          <span className="text-[10px] font-medium">Chariots</span>
        </Link>

        {/* Compte */}
        <Link
          href={user ? "/compte" : "/connexion"}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#6B7280] transition-colors active:text-[#356B0D]"
        >
          {initials ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#356B0D] text-[9px] font-semibold text-white">
              {initials}
            </span>
          ) : (
            <User className="h-5 w-5" />
          )}
          <span className="text-[10px] font-medium">Compte</span>
        </Link>

        {/* Panier */}
        <Link
          href="/panier"
          className="relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[#6B7280] transition-colors active:text-[#356B0D]"
        >
          <span className="relative">
            <ShoppingCart className="h-5 w-5" />
            <CartCount />
          </span>
          <span className="text-[10px] font-medium">Panier</span>
        </Link>
      </div>
      {/* Safe area for iPhone notch */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
