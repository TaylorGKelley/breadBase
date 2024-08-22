import { cookies } from 'next/headers';
import processSetCookie from '../utils/processSetCookie';

export const signup = async (
  firstName: FormDataEntryValue,
  lastName: FormDataEntryValue,
  email: FormDataEntryValue,
  password: FormDataEntryValue,
) => {
  'use server';

  try {
    // Handle signup
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/signup`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          displayName: `${firstName} ${lastName}`,
          email,
          password,
        }),
      },
    );

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      // Parse and set the cookies
      const cookieStore = cookies();

      const { name, value, path, expires, httpOnly } =
        processSetCookie(setCookieHeader)[0];

      cookieStore.set(name.trim(), value.trim(), {
        path,
        expires,
        httpOnly,
      });
    }
    return response;
  } catch (error) {
    return undefined;
  }
};
