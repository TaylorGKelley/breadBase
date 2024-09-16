'use client';

import UserIcon from '@/components/icons/User';
import useAuthStore from '@/store/useAuthStore';
import type User from '@/types/User';
import { BakerRoles } from '@/types/UserRole';
import React from 'react';
import { Gear, Heart, Logout } from '../icons';
import useMenuOpen from '@/hooks/useMenuOpen';
import Link from 'next/link';

const initializeMenuOptions = (user?: User | null) => {
  if (!user) {
    return [
      { text: 'Sign In', icon: <UserIcon />, url: '/Login' },
      { text: 'Create Account', icon: <UserIcon secondary />, url: '/SignUp' },
    ];
  } else if (BakerRoles.includes(user.role) || user.role === 'site_admin') {
    return [
      { text: 'My Bakery', icon: <UserIcon />, url: '/Bakery/Dashboard' },
      { text: 'Account', icon: <Gear />, url: '/Account' },
      { text: 'Logout', icon: <Logout />, url: '/Logout' },
    ];
  } else {
    return [
      { text: 'Account', icon: <UserIcon />, url: '/Account' },
      { text: 'Favorites', icon: <Heart />, url: '/Favorites' },
      { text: 'Logout', icon: <Logout />, url: '/Logout' },
    ];
  }
};

type AccountInfoProps = {};

function AccountInfo({}: AccountInfoProps) {
  const { user } = useAuthStore();
  const { menuOpen, setMenuOpen } = useMenuOpen();

  const handleCloseMenu = () => {
    if (menuOpen) {
      setTimeout(() => {
        setMenuOpen(false);
      }, 150);
    }
  };

  return (
    <div className='flex items-center gap-8'>
      <div
        onClick={handleCloseMenu}
        className='relative transition-all duration-300 hover:brightness-90'
      >
        <UserIcon />
        <div className='absolute right-0 top-full border-[1px] border-gray-800 bg-gray-950 odd:bg-gray-900'>
          {user && (
            <div>
              <h5 className=''>
                {user?.displayName || user?.firstName + ' ' + user?.lastName}
              </h5>
              <p className='ml-4 text-gray-800'>{user?.email}</p>
            </div>
          )}
          {initializeMenuOptions(user).map(({ text, icon, url }, i) => (
            <Link
              key={i}
              href={url}
              className='flex w-full cursor-pointer items-center gap-4 px-4 py-2'
            >
              {icon}
              <p>{`- ${text}`}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
