'use server';

import { LoginFormState as LoginFormResponse } from '@/types/AuthFormState';
import User from '@/types/User';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// const processLogin = async (formData: FormData): Promise<LoginFormResponse> => {
export default async (formData: FormData): Promise<LoginFormResponse> => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  // Validate email and password fields
  if (!email || email === '' || !password || password === '')
    return {
      success: false,
      email: email || '',
      errors: {
        email: !email ? 'Please provide a valid email address' : undefined,
        password: !password ? 'Please provide a password' : undefined,
      },
    };

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

    if (!response.ok || response?.status !== 201)
      return {
        success: false,
        email,
        errors: {
          message: 'Login failed, please try a different email or password',
        },
      };

    const data = (await response.json())?.data?.user as User;

    return {
      success: true,
      email,
      user: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      email,
    };
  }
};

// export default async (formData: FormData, redirectTo?: string) => {
//   const response = await processLogin(formData);

//   if (response.success) {
//     redirect(redirectTo || '/');
//   }

//   return response;
// };
