import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { Cart, Location, User } from '../icons/Icons';
import NavTitle from './NavTitle/NavTitle';

export default function Navbar() {
  return (
    <header
      id={styles.Navbar}
      className='h-5/6'
    >
      <div className={styles.NavMain_wrapper}>
        <div className={styles.NavMain}>
          <div className={styles.NavMain_findBakeryContainer}>
            <Link href='/Search/Bakery'>
              <Location width='1rem' />
              <p>Find a Bakery</p>
            </Link>
          </div>
          <div className={styles.NavMain_title}>
            <NavTitle />
          </div>
          <div className={styles.NavMain_accountContainer}>
            <Link href='/MyCart'>
              <Cart />
            </Link>
            <Link href='/Account'>
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
  );
}
