import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type UserRole from './types/UserRole';
import User from './types/User';
import { BakerRoles } from './types/UserRole';
import checkAuth from './actions/checkAuth';

type ProtectedRoute = {
  allowed: UserRole[];
  redirect: { notAuth: string; notAllowed: string };
  permanent: boolean;
  params?: string;
};

const protectedRoutes = new Map<string, ProtectedRoute>([
  [
    '/Account',
    {
      allowed: ['*'],
      redirect: { notAuth: '/Login', notAllowed: '/' },
      permanent: true,
    },
  ],
  [
    '/Bakery/Dashboard',
    {
      allowed: BakerRoles,
      redirect: { notAuth: '/Login', notAllowed: '/' },
      permanent: true,
      params: 'redirect=/Bakery/Dashboard',
    },
  ],
  [
    '/Bakery/Create',
    {
      allowed: ['standard_user'],
      redirect: { notAuth: '/Login', notAllowed: '/Bakery/Dashboard' },
      permanent: true,
      params: 'redirect=/Bakery/Create',
    },
  ],
  [
    '/Bakery/Create/Menu',
    {
      allowed: BakerRoles,
      redirect: { notAuth: '/Login', notAllowed: '/Bakery/Create' },
      permanent: true,
      params: 'redirect=/Bakery/Create/Menu',
    },
  ],
]);

export default async function authMiddleware(req: NextRequest) {
  console.log('middleware ran  ->  ', req.nextUrl.pathname);

  try {
    const url = new URL(req.nextUrl.pathname, req.url);

    const protectedRoute = protectedRoutes.get(req.nextUrl.pathname);
    if (!protectedRoute) return NextResponse.next();

    const { user, isAuthenticated } = await checkAuth();
    const isAuthorized = checkAuthorization(protectedRoute, user);

    if (!isAuthenticated) {
      url.pathname = protectedRoute.redirect.notAuth;
      if (protectedRoute.params) url.search = protectedRoute.params;
    } else if (!isAuthorized) {
      url.pathname = protectedRoute.redirect.notAllowed;
    }

    return req.nextUrl.pathname === url.pathname // url wasn't modified, so user is authorized
      ? NextResponse.next()
      : NextResponse.redirect(url);
  } catch (error) {
    console.error(error, ' from middleware fetch');
  }
}

const checkAuthorization = (
  protectedRoute: ProtectedRoute,
  user?: User,
): boolean => {
  if (!user) return false;
  if (!protectedRoute.allowed.includes('site_admin'))
    // site_admin is always allowed
    protectedRoute.allowed.push('site_admin');

  return (
    protectedRoute.allowed.includes(user.role) ||
    protectedRoute.allowed.includes('*')
  );
};

export const config = {
  matcher: [
    '/Account/:path*',
    '/Bakery/Dashboard/:path*',
    '/Bakery/Create/:path*',
  ],
};
