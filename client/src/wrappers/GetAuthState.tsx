'use client';

import useAuthStore from '@/store/useAuthStore';
import User from '@/types/User';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';

type GetAuthStateProps = PropsWithChildren<{}>;

function GetAuthState({ children }: GetAuthStateProps) {
  const pathname = usePathname();
  const { user, loginUser, logoutUser, updateLastUrl } = useAuthStore();

  useEffect(() => {
    const fetchCheckAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.URL_API || 'http://localhost:5001'}/api/v1/checkAuth`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );
        const data = await response.json();

        if (response.status === 200) {
          loginUser(data.data.user as User);
        } else {
          logoutUser();
          throw new Error('Failed to Authenticate User');
        }
      } catch (error) {
        console.error(error);
        logoutUser();
      }
    };

    updateLastUrl(pathname);

    if (!user) {
      fetchCheckAuth();
    }
  }, [pathname]);

  return <>{user !== undefined && children}</>; // * Preventing the page load before Auth State has been fetched, so flashing of the icons in the Navbar don't occur
}

export default GetAuthState;
