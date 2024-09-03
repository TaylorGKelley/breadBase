'use server';

import { cookies } from 'next/headers';
import processSetCookie from '../utils/processSetCookie';
import {
  ExtraInfoSignUpFormState,
  SignUpFormState as SignUpFormResponse,
} from '@/types/AuthFormState';
import User from '@/types/User';

export default async (formData: FormData): Promise<SignUpFormResponse> => {
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const passwordConfirm = formData.get('passwordConfirm')?.toString();

  if (
    !firstName ||
    firstName === '' ||
    !lastName ||
    lastName === '' ||
    !email ||
    email === '' ||
    !password ||
    password === '' ||
    !passwordConfirm ||
    passwordConfirm === ''
  )
    return {
      success: false,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      errors: {
        firstName: !firstName ? 'A first name is required' : undefined,
        lastName: !lastName ? 'A last name is required' : undefined,
        email: !email ? 'An email address is required' : undefined,
        password: !password ? 'A password is required' : undefined,
        passwordConfirm: !passwordConfirm
          ? 'A password is required'
          : undefined,
      },
    };

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
          passwordConfirm,
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

    // Return User data or error if sign up failed
    console.log(response.ok, response.status);
    if (response.status === 401) {
      return {
        success: false,
        firstName,
        lastName,
        email,
        errors: {
          passwordConfirm: 'Passwords do not match',
        },
      };
    } else if (!response.ok || response?.status !== 201) {
      const error = await response.json();
      return {
        success: false,
        firstName,
        lastName,
        email,
        errors: {
          message: error.message,
        },
      };
    }

    const data = (await response.json())?.data?.user as User;

    return {
      success: true,
      firstName,
      lastName,
      email,
      user: data,
    };
  } catch (error) {
    return {
      success: false,
      firstName,
      lastName,
      email,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const extraInfo = async (
  formData: FormData,
): Promise<ExtraInfoSignUpFormState> => {
  return { success: true } as ExtraInfoSignUpFormState;
};
