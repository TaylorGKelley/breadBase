import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleLogout = async () => {
  'use server';

  const isLoggedOut = await logout();
  cookies().delete('jwt');

  console.log('logging out ', isLoggedOut);

  if (isLoggedOut) redirect('/');
};

const logout = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/logOut`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) throw new Error('Logout failed');

    return true;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
};
