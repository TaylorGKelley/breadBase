'use client';

import React from 'react';
import { handleLogout } from '../../../actions/logout';
import useAuthStore from '@/store/useAuthStore';

export default function Account() {
  const { logoutUser } = useAuthStore();

  return (
    <main className='flex flex-col items-center justify-center'>
      <h3>My Account!</h3>
      <form
        action={async () => {
          await handleLogout();
          logoutUser();
        }}
      >
        <button
          type='submit'
          className='bg-yellow rounded-3xl px-10 py-5 font-semibold text-slate-50'
        >
          Logout
        </button>
      </form>
    </main>
  );
}
