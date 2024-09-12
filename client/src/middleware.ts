import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = new Map<string, string>([
  ['/Account', '/Login'],
  ['/Bakery/Dashboard', '/Login?redirect=/Bakery/Dashboard'],
  ['/Bakery/Create', '/Login?redirect=/Bakery/Create'],
]);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  console.log('middleware ran');
  try {
    // Check if user is accessing an (auth) protected route
    if (protectedRoutes.has(url.pathname.split('?').at(0) as string)) {
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

      console.log(authResponse.status);

      if (authResponse.status !== 200) {
        const [redirectTo, params] = protectedRoutes
          .get(url.pathname)
          ?.split('?') || ['/Login', ''];

        url.pathname = redirectTo;
        url.search = params;
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  matcher: [
    '/Account/:path*',
    '/Bakery/Create/:path*',
    '/Bakery/Dashboard/:path*',
  ],
};
