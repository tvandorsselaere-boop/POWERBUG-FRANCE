"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { CartCount } from "@/components/cart-count";

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
      {/* Simple golf trolley icon */}
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
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DBDBDB] bg-white md:hidden">
      <div className="flex h-14 items-stretch">
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
