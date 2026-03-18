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

  const stores: string[] = profile?.stores ?? [];
  if (!stores.includes(STORE)) {
    await supabase
      .from('profiles')
      .upsert({ id: userId, stores: [...stores, STORE] }, { onConflict: 'id' });
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
      if (error) return { error, existingUser: false };

      // Supabase returns a user with empty identities when the email already exists
      // (security: no email enumeration). Detect this and inform the caller.
      if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
        return {
          error: { message: "Un compte existe déjà avec cet email. Connectez-vous directement avec votre mot de passe." } as { message: string },
          existingUser: true,
        };
      }

      if (data.user) {
        await ensureStoreTag(supabase, data.user.id);
      }
      return { error: null, existingUser: false };
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return { user, loading, signIn, signUp, signOut };
}
