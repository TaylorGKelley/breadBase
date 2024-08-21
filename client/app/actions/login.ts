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
    const user = await response.json();

    const cookie = cookies().getAll();
    console.log(cookie);

    if (!response.ok) {
      return undefined;
    }

    return user;
  } catch (error) {
    return undefined;
  }
};

export const handleLogin = async (e: FormData) => {
  'use server';

  const email = e.get('email');
  const password = e.get('password');
  if (!email || !password) return 'No Email or Password';

  const user = await login(email, password);
  if (user) {
    console.log('login success');
    return redirect('/Account');
  }
};
