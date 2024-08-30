'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Cart, User } from '../icons/Icons';
import NavTitle from './NavTitle';
import NavDropdownMenu from './NavDropdownMenu';
import useAuthStore from '@/store/useAuthStore';

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <header className='fixed left-1/2 top-0 z-40 flex w-full -translate-x-1/2 flex-row items-center px-4 py-2 md:px-8'>
      <div className='z-50 flex-1'>
        <NavDropdownMenu />
      </div>
      <div className='relative z-50 flex h-16 w-max flex-col justify-center text-center'>
        <NavTitle />
      </div>
      <div className='z-50 flex flex-1 items-center justify-end'>
        {user !== null ? (
          <div className='flex items-center gap-8'>
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
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Link
              href='/Login'
              className='px-4 py-2'
            >
              Login
            </Link>
            <Link
              href='/SignUp'
              className='border-yellow text-yellow rounded-full border-2 px-6 py-2'
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
