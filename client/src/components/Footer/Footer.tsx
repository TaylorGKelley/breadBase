import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import { metamorphous } from '../../ui/fonts';

export default function Footer() {
  return (
    <footer className='bg-gray-800 px-8 py-20'>
      <div className='mx-auto flex w-full max-w-screen-lg items-center justify-between gap-4'>
        <div className='flex flex-col'>
          <h2 className={`${metamorphous.className}`}>BreadBase</h2>
          <p className='italic'>BreadBase &copy; 2024</p>
        </div>
        <div className='flex gap-6'>
          <Link
            href='/Search/Bakery'
            className='hover:underline'
          >
            Find a Bakery
          </Link>
          <p>{' / '}</p>
          <Link
            href='/Bakery/SignUp'
            className='hover:underline'
          >
            Register a Bakery
          </Link>
        </div>
      </div>
    </footer>
  );
}
