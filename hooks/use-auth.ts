'use client';

import { useEffect, useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase/browser';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';

const STORE = 'powerbug';

/**
 * Ensure the current user is tagged for this store in their profile.
 * Called after every successful auth (sign-in, sign-up, Google).
 */
async function ensureStoreTag(supabase: ReturnType<typeof createBrowserClient>, userId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('stores')
    .eq('id', userId)
    .single();

  if (!profile) return;

  const stores: string[] = profile.stores ?? [];
  if (!stores.includes(STORE)) {
    await supabase
      .from('profiles')
      .update({ stores: [...stores, STORE] })
      .eq('id', userId);
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    async function getInitialUser() {
      const { data: { user: u } } = await (supabase.auth.getUser() as Promise<{ data: { user: User | null } }>);
      setUser(u);
      setLoading(false);
    }
    getInitialUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        await ensureStoreTag(supabase, data.user.id);
      }
      return { error };
    },
    [supabase]
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, store: STORE } },
      });
      // Trigger handles initial store tag via metadata,
      // but also ensure it in case trigger didn't fire (e.g. user already existed)
      if (!error && data.user) {
        await ensureStoreTag(supabase, data.user.id);
      }
      return { error };
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return { user, loading, signIn, signUp, signOut };
}
