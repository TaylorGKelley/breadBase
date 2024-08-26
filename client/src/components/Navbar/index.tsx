'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './styles.css';
import { Cart, Location, User } from '../icons/Icons';
import NavTitle from './NavTitle';

export default function Navbar({ simple }: Readonly<{ simple: boolean }>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return !simple ? (
    <header className='h-36 bg-gray-700'>
      <div className='fixed left-1/2 top-0 z-50 w-full -translate-x-1/2'>
        <div className='mx-auto flex max-w-screen-2xl justify-between bg-gray-800 px-12 py-4'>
          <div className='flex flex-1 items-center'>
            <Link
              href='/Search/Bakery'
              className='relative z-10 flex items-center gap-2 rounded-full px-6 py-3 transition-colors duration-500 hover:bg-gray-900'
            >
              <Location width='1rem' />
              <p>Find a Bakery</p>
            </Link>
          </div>
          <div className='relative flex h-16 w-max flex-col justify-center text-center'>
            <NavTitle />
          </div>
          <div className='flex flex-1 items-center justify-end gap-8'>
            <Link
              href='/MyCart'
              className='transition-all duration-300 hover:brightness-90'
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
        </div>
        <nav className='bg-gray-900 p-4'>
          <ul className='flex list-none justify-center gap-10'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/Search/Bakery'>Bakeries</Link>
            </li>
            {/* <li>
              <Link href='/Search/Product'>Products</Link>
            </li> */}
            <li>
              <Link href='/Search/Recipe'>Recipes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  ) : (
    <header className='fixed left-1/2 top-0 z-40 flex w-full -translate-x-1/2 flex-row items-center px-4 md:px-8'>
      <div className='flex-1'>
        <div
          className={`menu-open ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className='relative flex h-16 w-max flex-col justify-center text-center'>
        <NavTitle />
      </div>
      <div className='flex flex-1 items-center justify-end gap-8'>
        <Link
          href='/MyCart'
          className='transition-all duration-300 hover:brightness-90'
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
      <nav
        className={`absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center gap-6 bg-gray-900 px-10 py-20 ${isMenuOpen ? 'open' : ''}`}
      >
        <ul>
          <li>
            <Link
              href='/'
              className='relative text-xl text-white'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/'
              className='relative text-xl text-white'
            >
              Bakeries
            </Link>
          </li>
          <li>
            <Link
              href='/'
              className='relative text-xl text-white'
            >
              Recipes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
