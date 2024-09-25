'use server;';

import User from '@/types/User';
import { cookies } from 'next/headers';

export default async function () {
  try {
    const tokenCookie = cookies().get('jwt')?.value || '';

    const response = await fetch(
      `${process.env.URL_API || 'http://localhost:5001'}/api/v1/checkAuth`,
      {
        headers: {
          // * This passes the auth token, as fetch() ran from the server doesn't contain the same cookies as in the client request.
          // ->  https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
          Cookie: `jwt=${tokenCookie}`,
        },
      },
    );

    const data = await response.json();

    if (response.status === 200) {
      return {
        isAuthenticated: data.isAuthenticated,
        user: data.data.user as User,
        status: response.status,
      };
    } else {
      throw new Error('Failed to Authenticate User');
    }
  } catch (error) {
    return { isAuthenticated: false, user: undefined, status: 500 };
  }
}
