export default function middleware(request) {
  const url = new URL(request.url);

  // Allow access to login page, API routes, and static assets
  if (
    url.pathname === '/login' ||
    url.pathname === '/login.html' ||
    url.pathname.startsWith('/api/') ||
    url.pathname === '/privacy' ||
    url.pathname === '/privacy/' ||
    url.pathname.startsWith('/privacy/') ||
    url.pathname === '/favicon.ico'
  ) {
    return undefined;
  }

  // Check for auth cookie
  const cookies = request.headers.get('cookie') || '';
  const hasAuth = cookies.split(';').some(c => c.trim().startsWith('avyro_auth='));

  if (hasAuth) {
    // Validate the cookie value
    const authCookie = cookies
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('avyro_auth='));
    const value = authCookie ? authCookie.split('=')[1] : '';

    if (value === 'authenticated') {
      return undefined; // Allow through
    }
  }

  // Redirect to login
  return Response.redirect(new URL('/login', request.url), 302);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
