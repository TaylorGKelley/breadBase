'use client';

import useAuthStore from '@/store/useAuthStore';
import User from '@/types/User';
import React, { useEffect } from 'react';

type GetAuthStateProps = {
  children?: React.ReactNode;
};

function GetAuthState({ children }: GetAuthStateProps) {
  const { currentUser, signInUser, logoutUser } = useAuthStore();

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
          signInUser(data.data.user as User);
        } else {
          throw new Error('Failed to Authenticate User');
        }
      } catch (error) {
        console.error(error);
        logoutUser();
      }
    };

    if (!currentUser) {
      fetchCheckAuth();
    }
  }, []);

  return <>{currentUser !== undefined && children}</>; // * Preventing the page load before Auth State has been fetched, so flashing of the icons in the Navbar don't occur
}

export default GetAuthState;
