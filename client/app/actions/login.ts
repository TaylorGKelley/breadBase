import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const login = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue,
) => {
  'use server';

  try {
    // Handle login
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/signin`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      // Parse and set the cookies
      const cookieStore = cookies();
      const cookieArray = setCookieHeader.split(','); // Assuming multiple cookies are separated by commas
      cookieArray.forEach((cookie) => {
        const [nameValue] = cookie.split(';');
        const [name, value] = nameValue.split('=');
        if (name && value)
          cookieStore.set(name.trim(), value.trim(), {
            // Add any additional cookie attributes here
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          });
      });
    }

    if (!response.ok) {
      return undefined;
    }

    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const handleLogin = async (e: FormData) => {
  'use server';

  const email = e.get('email');
  const password = e.get('password');
  if (!email || !password)
    return {
      status: 404,
      message: `Please provide an ${!email ? 'email' : 'password'}`,
      error: 'Login Failed',
    };

  const response = await login(email, password);
  if (response && response?.status !== 201)
    return {
      status: response?.status,
      message: response?.statusText,
      error: 'Login Failed',
    };

  // Redirect to Account page if successful
  redirect('/Account');
};
