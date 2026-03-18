"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4", countKey: null },
  { href: "/admin/commandes", label: "Commandes", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", countKey: "orders" as const },
  { href: "/admin/stock", label: "Stock", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", countKey: "stock" as const },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [counts, setCounts] = useState<{ orders: number; stock: number }>({ orders: 0, stock: 0 });

  useEffect(() => {
    fetch("/api/admin/counts")
      .then((r) => r.json())
      .then((d) => {
        setCounts({
          orders: (d.pendingOrders ?? 0) + (d.needsTracking ?? 0),
          stock: (d.outOfStock ?? 0) + (d.lowStock ?? 0),
        });
      })
      .catch(() => {});
  }, [pathname]); // refresh on navigation

  return (
    <div className="flex min-h-[calc(100vh-180px)]">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-56 bg-[#0F0F10] text-white flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <h2 className="text-base font-semibold tracking-wide">Admin</h2>
          <p className="text-xs text-gray-400 mt-0.5">PowerBug France</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const badgeCount = item.countKey ? counts[item.countKey] : 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#356B0D] text-white font-medium"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
                {badgeCount > 0 && (
                  <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            &larr; Retour au site
          </Link>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F0F10] z-50 border-t border-white/10">
        <nav className="flex justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const badgeCount = item.countKey ? counts[item.countKey] : 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-1 px-3 py-1.5 text-xs ${
                  isActive ? "text-[#8DC63F]" : "text-gray-400"
                }`}
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                      {badgeCount}
                    </span>
                  )}
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 p-4 md:p-8 pb-24 md:pb-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}
