'use client';

import UserIcon from '@/components/icons/User';
import useAuthStore from '@/store/useAuthStore';
import type User from '@/types/User';
import { BakerRoles } from '@/types/UserRole';
import React from 'react';
import { Gear, Heart, Logout, Store } from '../icons';
import useMenuOpen from '@/hooks/useMenuOpen';
import Link from 'next/link';
import { handleLogout } from '@/actions/logout';
import { metamorphous } from '@/ui/fonts';
import ProfilePhoto from '../UI/ProfilePhoto';

type AccountInfoProps = {};

function AccountInfo({}: AccountInfoProps) {
  const { user, logoutUser } = useAuthStore();
  const { menuOpen, setMenuOpen } = useMenuOpen();

  const initializeMenuOptions = (user?: User | null) => {
    if (!user) {
      return [
        { text: 'Sign In', icon: <UserIcon width='1.75rem' />, url: '/Login' },
        {
          text: 'Create Account',
          icon: (
            <UserIcon
              width='1.75rem'
              secondary
            />
          ),
          url: '/SignUp',
        },
      ];
    } else if (BakerRoles.includes(user.role) || user.role === 'site_admin') {
      return [
        {
          text: 'My Bakery',
          icon: <Store width='1.75rem' />,
          url: '/Bakery/Dashboard',
        },
        { text: 'Account', icon: <Gear width='1.75rem' />, url: '/Account' },
        {
          text: 'Logout',
          icon: <Logout width='1.75rem' />,
          url: '/',
          onClick: logout,
        },
      ];
    } else {
      return [
        {
          text: 'Account',
          icon: <UserIcon width='1.75rem' />,
          url: '/Account',
        },
        {
          text: 'Favorites',
          icon: <Heart width='1.75rem' />,
          url: '/Favorites',
        },
        {
          text: 'Logout',
          icon: <Logout width='1.75rem' />,
          url: '/Logout',
          onClick: logout,
        },
      ];
    }
  };

  const logout = async () => {
    await handleLogout();
    logoutUser();
    console.log('logout ran');
  };

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
        className='relative transition-all duration-300'
      >
        <span className='cursor-pointer'>
          {!user?.profilePhoto ? (
            <UserIcon width='40px' />
          ) : (
            <ProfilePhoto
              photoBase={user?.profilePhoto}
              width={40}
            />
          )}
        </span>
        <nav
          className={`${metamorphous.className} absolute right-0 top-[150%] flex min-w-64 flex-col gap-4 rounded-3xl border-[1px] border-gray-800 bg-gray-900 px-4 py-5 shadow-lg shadow-gray-950 outline-white`}
        >
          {user && (
            <div className='border-b border-b-[#989898] px-4 pb-4'>
              <h5 className=''>
                {user.displayName || user.firstName + ' ' + user.lastName}
              </h5>
              <p className='ml-2 text-gray-300'>{user.email}</p>
            </div>
          )}
          <div className='flex flex-col gap-1'>
            {initializeMenuOptions(user).map(
              ({ text, icon, url, onClick }, i) => (
                <Link
                  key={i}
                  href={url}
                  className='flex w-full cursor-pointer items-center gap-4 text-nowrap rounded-xl px-4 py-3 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-950'
                  onClick={onClick}
                >
                  {icon}
                  <p>{`- ${text}`}</p>
                </Link>
              ),
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default AccountInfo;
