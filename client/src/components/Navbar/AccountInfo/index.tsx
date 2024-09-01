'use client';

import Cart from '@/components/icons/Cart';
import User from '@/components/icons/User';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function AccountInfo() {
  const { user } = useAuthStore();
  const [isScreenNarrow, setIsScreenNarrow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () =>
        setIsScreenNarrow(window.innerWidth < 640),
      );
    }
  }, []);

  return (
    <div className='items-center gap-8'>
      {user !== null ? (
        <>
          {isScreenNarrow && (
            <Link
              href='/MyCart'
              className='transition-all duration-300 hover:brightness-90'
            >
              <Cart />
            </Link>
          )}
          <Link
            href='/Account'
            className='transition-all duration-300 hover:brightness-90'
          >
            <User />
          </Link>
        </>
      ) : (
        <>
          <Link
            href='/Login'
            className='px-4 py-2'
          >
            {!isScreenNarrow ? 'Login' : <User />}
          </Link>
          {!isScreenNarrow && (
            <Link
              href='/SignUp'
              className='border-yellow text-yellow rounded-full border-2 px-6 py-2'
            >
              Sign Up
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default AccountInfo;
