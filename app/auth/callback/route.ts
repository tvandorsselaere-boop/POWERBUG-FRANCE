import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const STORE = 'powerbug';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/compte';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Tag le user pour ce store (confirmation email, magic link, etc.)
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

  return NextResponse.redirect(`${origin}/connexion`);
}
