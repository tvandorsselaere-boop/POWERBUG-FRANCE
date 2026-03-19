import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If a Supabase auth code arrives on any page (e.g. password reset link),
  // redirect to /auth/callback so it gets exchanged for a session
  const code = request.nextUrl.searchParams.get('code');
  if (code && pathname !== '/auth/callback') {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback';
    // Preserve next param if present, otherwise default based on context
    if (!url.searchParams.has('next')) {
      url.searchParams.set('next', '/compte');
    }
    return NextResponse.redirect(url);
  }

  // Determine if we need auth checks
  const needsAuth = pathname.startsWith('/compte') || pathname.startsWith('/admin');
  const isAuthPage = pathname === '/connexion' || pathname === '/inscription';

  if (!needsAuth && !isAuthPage) {
    return NextResponse.next();
  }

  // Create Supabase client to check auth and refresh session cookies
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /compte/* -- must be authenticated
  if (pathname.startsWith('/compte')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/connexion';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect /admin/* -- must be ADMIN_EMAIL
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/connexion';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    const admins = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "").split(",").map(e => e.trim().toLowerCase());
    if (!user.email || !admins.includes(user.email.toLowerCase())) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from login/signup
  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/compte';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!api|auth|_next/static|_next/image|favicon.ico|images|videos|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
