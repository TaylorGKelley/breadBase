'use client';

import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleNav = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <header>
      <div>
        <button
          type='button'
          className={styles.NavToggleButton}
          onClick={toggleNav}
        >
          <div className={menuIsOpen ? styles.Open : ''}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <nav className={`${styles.NavDropdown}`}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
      <div>
        <Link href={'about'}></Link>
        <Link href={'cart'}></Link>
      </div>
    </header>
  );
}
