'use client';

import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { Cart, User } from '../../../../public/icons/Icons';

export default function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleNav = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <header id={styles.Navbar}>
      <div>
        <div
          className={styles.NavToggleButton}
          onClick={toggleNav}
        >
          <div className={menuIsOpen ? styles.Open : ''}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <nav className={`${styles.NavDropdown}`}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
      <div className={styles.NavControls_userCartContainer}>
        <Link href='/MyCart'>
          <Cart />
        </Link>
        <Link href='/MyAccount'>
          <User />
        </Link>
      </div>
    </header>
  );
}
