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
        const [nameValue, ...attributes] = cookie.split(';');
        const [name, value] = nameValue.split('=');
        cookieStore.set(name.trim(), value.trim(), {
          // Add any additional cookie attributes here
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          ...attributes,
        });
      });
    }

    if (!response.ok) {
      return undefined;
    }

    return response;
  } catch (error) {
    return undefined;
  }
};

export const handleLogin = async (e: FormData) => {
  'use server';

  const email = e.get('email');
  const password = e.get('password');
  if (!email || !password) return 'No Email or Password';

  const response = await login(email, password);
  if (response?.status !== 201) return console.log('try again');

  console.log('login success');
  redirect('/Account');
};
