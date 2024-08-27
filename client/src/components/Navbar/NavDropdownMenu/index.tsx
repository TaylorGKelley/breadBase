'use client';

import React, { useEffect, useState } from 'react';
import './styles.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  {
    displayText: 'Home',
    url: '/',
  },
  {
    displayText: 'Bakeries',
    url: '/Search/Bakery',
  },
  {
    displayText: 'Recipes',
    url: '/Search/Recipes',
  },
];

function NavDropdownMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
        className={`absolute left-0 top-0 flex h-auto min-h-screen w-screen items-center justify-center gap-6 overflow-auto bg-gray-950 py-20 ${isMenuOpen ? 'open' : 'closed'}`}
      >
        <ul className='flex flex-col gap-4 text-center text-white transition-all duration-500 hover:text-gray-400 hover:*:text-white hover:*:transition-colors md:px-8 lg:px-12'>
          {links.map((link, i) => (
            <li key={i}>
              <Link
                href={link.url}
                className={`relative text-xl font-extralight lg:text-3xl`}
              >
                {link.displayText}
              </Link>
            </li>
          ))}
          <li className='mx-auto mt-4 flex w-fit items-center gap-4'>
            <Link
              href='/Login'
              className='flex-grow'
            >
              Log in
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavDropdownMenu;
