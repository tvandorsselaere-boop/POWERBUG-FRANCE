"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:border-red-300 hover:text-red-600"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      Se deconnecter
    </button>
  );
}
