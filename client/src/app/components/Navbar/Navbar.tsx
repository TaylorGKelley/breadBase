'use client';

import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { Cart, Location, User } from '../icons/Icons';
import useSelectedBakery from '@/app/store/selectedBakery';

export default function Navbar() {
  const { title: bakeryTitle } = useSelectedBakery();

  return (
    <header id={styles.Navbar}>
      <div className='NavMain_wrapper'>
        <div className={styles.NavMain}>
          <div className={styles.NavMain_findBakeryContainer}>
            <Location width='1rem' />
            <Link href='/Search/Bakery'>Find a Bakery</Link>
          </div>
          <div className={styles.NavMain_title}>
            {bakeryTitle !== '' ? (
              <>
                <span>Selected:</span>
                <Link href={`/BakeryHome/${bakeryTitle}`}>
                  <p>{bakeryTitle}</p>
                </Link>
              </>
            ) : (
              <Link href='/'>
                <h5>BreadBase</h5>
              </Link>
            )}
          </div>
          <div className={styles.NavMain_accountContainer}>
            <Link href='/MyCart'>
              <Cart />
            </Link>
            <Link href='/MyAccount'>
              <User />
            </Link>
          </div>
        </div>
        <nav className={styles.NavDropdown}>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/'>Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
