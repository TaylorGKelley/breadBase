'use client';

import useAuthStore from '@/store/useAuthStore';
import User from '@/types/User';
import React, { useEffect } from 'react';

type GetAuthStateProps = {
  children?: React.ReactNode;
};

function GetAuthState({ children }: GetAuthStateProps) {
  const { isAuthenticated, signInUser, logoutUser } = useAuthStore();

  useEffect(() => {
    const fetchCheckAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.URL_API || 'http://localhost:5001'}/api/v1/checkAuth`,
          {
            method: 'GET',
            credentials: 'same-origin',
          },
        );
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
          const userData = JSON.parse(await response.json()) as User;
          signInUser(userData);
          console.log(userData);
        } else {
          throw new Error('Failed to Authenticate User');
        }
      } catch (error) {
        logoutUser();
      }
    };

    if (!isAuthenticated) {
      fetchCheckAuth();
      console.log(isAuthenticated);
    }
  }, []);

  return <>{children}</>;
}

export default GetAuthState;
