import { cookies } from 'next/headers';
import processSetCookie from '../utils/processSetCookie';

const signup = async (
  firstLastName: FormDataEntryValue,
  email: FormDataEntryValue,
  password: FormDataEntryValue,
) => {
  'use server';

  try {
    const [firstName, lastName] = firstLastName.toString().split(' ');

    // Handle signup
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/signup`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstLastName, email, password }),
      },
    );

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      // Parse and set the cookies
      const cookieStore = cookies();

      const { name, value, path, expires, httpOnly } =
        processSetCookie(setCookieHeader);

      cookieStore.set(name.trim(), value.trim(), {
        path: path,
        expires: expires,
        httpOnly,
      });
    }
    return response;
  } catch (error) {
    return undefined;
  }
};
