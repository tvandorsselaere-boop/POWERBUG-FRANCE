"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, ShoppingCart, User, LogOut, Package, Settings, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartCount } from "@/components/cart-count";
import { MobileBottomBar } from "@/components/mobile-bottom-bar";
import { useAuth } from "@/hooks/use-auth";

const navigation = [
  { name: "Chariots", href: "/trolleys" },
  { name: "Accessoires", href: "/accessoires" },
  { name: "Pieces", href: "/pieces-detachees" },
  { name: "Videos", href: "/videos" },
  { name: "Avis", href: "/avis" },
  { name: "Notre histoire", href: "/notre-histoire" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    fetch("/api/admin/check").then((r) => r.json()).then((d) => setIsAdmin(d.isAdmin === true)).catch(() => setIsAdmin(false));
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 border-b border-[#DBDBDB] bg-white">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/powerbug-logo.png"
            alt="PowerBug"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-[#0F0F10] transition-colors hover:text-[#356B0D]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1">
          {/* User icon / dropdown */}
          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-[#0F0F10] hover:text-[#356B0D]">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#356B0D] text-xs font-semibold text-white">
                      {initials}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-xs text-[#6B7280] truncate">{user.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/compte" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Mon compte
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/compte/commandes" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      Mes commandes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/compte/parametres" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Parametres
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          Administration
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Deconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="text-[#0F0F10] hover:text-[#356B0D]" asChild>
                <Link href="/connexion">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )
          )}

          {/* Cart — desktop only, mobile uses bottom bar */}
          <Button variant="ghost" size="icon" className="relative hidden text-[#0F0F10] hover:text-[#356B0D] md:flex" asChild>
            <Link href="/panier">
              <ShoppingCart className="h-5 w-5" />
              <CartCount />
            </Link>
          </Button>

          {/* Mobile menu — Sheet only, trigger is in bottom bar */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-72 border-[#DBDBDB] bg-white">
              <nav className="mt-8 flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium text-[#0F0F10] transition-colors hover:bg-[#F5F5F5] hover:text-[#356B0D]"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="my-2 border-t border-[#DBDBDB]" />

                {user ? (
                  <>
                    <Link href="/compte" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-base font-medium text-[#0F0F10] transition-colors hover:bg-[#F5F5F5] hover:text-[#356B0D]">
                      Mon compte
                    </Link>
                    <Link href="/compte/commandes" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-base font-medium text-[#0F0F10] transition-colors hover:bg-[#F5F5F5] hover:text-[#356B0D]">
                      Mes commandes
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-base font-medium text-[#356B0D] transition-colors hover:bg-[#F5F5F5]">
                        Administration
                      </Link>
                    )}
                    <button
                      onClick={() => { setOpen(false); handleSignOut(); }}
                      className="rounded-lg px-4 py-3 text-left text-base font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      Deconnexion
                    </button>
                  </>
                ) : (
                  <Link href="/connexion" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-base font-medium text-[#356B0D] transition-colors hover:bg-[#F5F5F5]">
                    Connexion
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile bottom navigation bar */}
      <MobileBottomBar onMenuOpen={() => setOpen(true)} />
    </header>
  );
}
