'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const logout = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/logOut`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) throw new Error('Failed to log out');

    return response;
  } catch (error) {
    return undefined;
  }
};
export const handleLogout = async () => {
  const response = await logout();
  if (!response) {
    return {
      status: 500,
      message: 'Failed to log out',
      error: 'Logout Failed',
    };
  } else {
    cookies().delete('jwt');
    redirect('/');
  }
};
