import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type UserRole from './types/UserRole';
import User from './types/User';
import { BakerRoles } from './types/UserRole';
import { permanentRedirect, redirect, RedirectType } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
      redirect: { notAuth: '/Login', notAllowed: '/' },
      permanent: true,
      params: 'redirect=/Bakery/Create/Menu',
    },
  ],
]);

export default async function authMiddleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  try {
    const url = new URL(req.nextUrl.pathname, req.url);

    const protectedRoute = protectedRoutes.get(req.nextUrl.pathname);
    if (!protectedRoute) return NextResponse.next();

    const { user, isAuthenticated } = await checkAuthenticated();
    const isAuthorized = checkAuthorization(protectedRoute, user);

    if (!isAuthenticated) {
      url.pathname = protectedRoute.redirect.notAuth;
      if (protectedRoute.params) url.search = protectedRoute.params;
    } else if (!isAuthorized) {
      url.pathname = protectedRoute.redirect.notAllowed;
    }

    console.log(url.pathname, isAuthenticated, isAuthorized);

    const statusCode = protectedRoute.permanent ? 308 : 307;

    return req.nextUrl.pathname === url.pathname // url wasn't modified, so user is authorized
      ? NextResponse.next()
      : NextResponse.redirect(url);
  } catch (error) {
    console.error(error, ' from middleware fetch');
  }
}

const checkAuthenticated = async (): Promise<{
  user?: User;
  isAuthenticated: boolean;
  status: number;
  error?: Error;
}> => {
  try {
    const tokenCookie = cookies().get('jwt')?.value || '';

    const authResponse = await fetch(
      `${process.env.URL_API || 'http://localhost:5001'}/api/v1/checkAuth`,
      {
        headers: {
          // * This passes the auth token, as fetch() ran from the server doesn't contain the same cookies as in the client request.
          // ->  https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
          Cookie: `jwt=${tokenCookie}`,
        },
      },
    );

    const body = await authResponse.json();

    return {
      user: body.data.user,
      isAuthenticated: body.data.isAuthenticated,
      status: authResponse.status,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      status: 500,
      error: error as Error,
    };
  }
};

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
