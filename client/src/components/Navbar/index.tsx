'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Cart, User } from '../icons/Icons';
import NavTitle from './NavTitle';
import NavDropdownMenu from './NavDropdownMenu';
import useAuthStore from '@/store/useAuthStore';

export default function Navbar() {
  const { isAuthenticated, signInUser, logoutUser } = useAuthStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URI || 'http://localhost:5001'}/api/v1/checkAuth`,
          {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
          },
        );
        const data = await response.json();

        console.log(data);
        if (response.status === 200 && data.isAuthenticated) {
          signInUser(data.user);
        }
      } catch (error) {
        // console.log((error as Error).message);
      }
    };

    if (!isAuthenticated) checkAuthStatus();
  }, []);

  return (
    <header className='fixed left-1/2 top-0 z-40 flex w-full -translate-x-1/2 flex-row items-center px-4 md:px-8'>
      <div className='z-50 flex-1'>
        <NavDropdownMenu />
      </div>
      <div className='relative z-50 flex h-16 w-max flex-col justify-center text-center'>
        <NavTitle />
      </div>
      <div className='z-50 flex flex-1 items-center justify-end gap-8'>
        {!isAuthenticated ? (
          <>
            <Link
              href='/MyCart'
              className='hidden transition-all duration-300 hover:brightness-90 sm:block'
            >
              <Cart />
            </Link>
            <Link
              href='/Account'
              className='transition-all duration-300 hover:brightness-90'
            >
              <User />
            </Link>
          </>
        ) : (
          <>
            <Link href='/SignIn'>Sign In/Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
