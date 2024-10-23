'use client';

import React from 'react';
import { handleLogout } from '../../../actions/logout';
import useAuthStore from '@/store/useAuthStore';

export default function Account() {
  const { user } = useAuthStore();

  return (
    <main className='flex flex-col items-center justify-center'>
      <h3>My Account!</h3>
      Welcome, {user?.firstName || ''} {user?.lastName || ' '}
    </main>
  );
}
