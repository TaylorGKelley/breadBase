import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/Account'];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  try {
    if (protectedRoutes.includes(req.nextUrl.clone().pathname)) {
      const tokenCookie = cookies().get('jwt')?.value || '';

      const authResponse = await fetch(
        `${process.env.URL_API || 'http://localhost:5001'}/api/v1/checkAuth`,
        {
          headers: {
            // * This passes the auth token, as fetch run from the server doesn't contain the same cookies as in the client request.
            // ->  https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
            Cookie: `jwt=${tokenCookie}`,
          },
        },
      );

      if (authResponse.status !== 200) {
        url.pathname = '/Login';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  matcher: ['/Account/:path*'],
};
