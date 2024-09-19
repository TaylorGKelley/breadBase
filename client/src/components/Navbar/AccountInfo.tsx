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
        { text: 'Profile', icon: <Gear width='1.75rem' />, url: '/Profile' },
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
          text: 'My Account',
          icon: <UserIcon width='1.75rem' />,
          url: '/Account',
        },
        {
          text: 'Profile',
          icon: <Gear width='1.75rem' />,
          url: '/Profile',
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
  };

  const handleCloseMenu = () => {
    if (menuOpen) {
      setTimeout(() => {
        setMenuOpen(false);
      }, 150);
    }
  };

  const menuOptions = initializeMenuOptions(user);

  return (
    <div className='flex items-center gap-8'>
      <div
        onClick={handleCloseMenu}
        className='relative transition-all duration-300'
      >
        <Link
          className='peer cursor-pointer'
          href='/Account'
        >
          {!user?.profilePhoto ? (
            <UserIcon width='40px' />
          ) : (
            <ProfilePhoto
              photoBase={user?.profilePhoto}
              width={40}
            />
          )}
        </Link>
        {/* // TODO: Switch to group hover and get rid of 2 extra classes */}
        <div className='pointer-events-none absolute right-0 top-[90%] pt-6 opacity-0 transition-all duration-300 hover:pointer-events-auto hover:opacity-100 peer-hover:pointer-events-auto peer-hover:opacity-100'>
          <nav
            className={`${metamorphous.className} flex min-w-64 flex-col gap-4 rounded-3xl border-[1px] border-gray-800 bg-gray-900 px-4 py-5 shadow-lg shadow-gray-950 outline-white`}
          >
            {user && (
              <div className='border-b border-b-[#989898] px-4 pb-4'>
                <h5>
                  {user.displayName ||
                    (user.firstName || '') + ' ' + (user.lastName || '')}
                </h5>
                <p className='ml-2 text-gray-300'>{user.email}</p>
              </div>
            )}
            <div className='flex flex-col gap-1'>
              {menuOptions.map(({ text, icon, url, onClick }, i) => (
                <Link
                  key={i}
                  href={url}
                  className='flex w-full cursor-pointer items-center gap-4 text-nowrap rounded-xl px-4 py-3 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-950'
                  onClick={onClick}
                >
                  {icon}
                  <p>{`- ${text}`}</p>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
