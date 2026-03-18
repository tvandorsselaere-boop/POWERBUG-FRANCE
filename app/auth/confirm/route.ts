import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const STORE = 'powerbug';

/**
 * Handles email confirmation links that use token_hash (PKCE/SSR pattern).
 * Used for: signup confirmation, password reset, magic links.
 * The email template sends: /auth/confirm?token_hash=xxx&type=recovery&next=/compte/nouveau-mot-de-passe
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as 'recovery' | 'signup' | 'email' | 'magiclink' | null;
  const next = searchParams.get('next') ?? '/compte';

  if (token_hash && type) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (!error && data.user) {
      // Tag user for this store
      const { data: profile } = await supabase
        .from('profiles')
        .select('stores')
        .eq('id', data.user.id)
        .single();

      const stores: string[] = profile?.stores ?? [];
      if (!stores.includes(STORE)) {
        await supabase
          .from('profiles')
          .upsert({ id: data.user.id, stores: [...stores, STORE] }, { onConflict: 'id' });
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If verification fails, redirect to login with error
  return NextResponse.redirect(`${origin}/connexion`);
}
