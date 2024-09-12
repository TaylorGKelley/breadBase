'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './DropdownMenu.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    displayText: 'Home',
    url: '/',
  },
  {
    displayText: 'Bakeries',
    url: '/Bakery/Search',
  },
  {
    displayText: 'Recipes',
    url: '/Recipe/Search',
  },
];

type NavDropdownMenuProps = {
  menuOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
};

function NavDropdownMenu({ menuOpenState }: NavDropdownMenuProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = menuOpenState;

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  }, [pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`menu-open ${isMenuOpen ? 'open' : 'closed'}`}
        onClick={handleMenuToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav
        className={`fixed left-0 top-0 flex h-[101dvh] w-full items-center justify-center gap-6 overflow-auto bg-gray-950 py-20 ${isMenuOpen ? 'open' : 'closed'}`}
      >
        <ul className='flex flex-col gap-4 text-center text-white transition-all duration-500 hover:text-gray-400 hover:*:transition-colors md:px-8 lg:px-12 hover:[&>li]:text-white'>
          {links.map((link, i) => (
            <li key={i}>
              <Link
                href={link.url}
                className={`relative text-xl font-extralight lg:text-3xl`}
                onClick={handleLinkClick}
              >
                {link.displayText}
              </Link>
            </li>
          ))}
          <div className='mx-auto mt-4 flex w-fit items-center gap-4 hover:text-gray-400 hover:*:text-white'>
            <Link
              href='/Login'
              className='flex-grow'
              onClick={handleLinkClick}
            >
              Log in
            </Link>
            <span>{' / '}</span>
            <Link
              href='/Bakery/Create'
              className='flex-grow'
              onClick={handleLinkClick}
            >
              Create Bakery
            </Link>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default NavDropdownMenu;
