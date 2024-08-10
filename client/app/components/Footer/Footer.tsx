import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import { metamorphous } from '../../ui/fonts';

export default function Footer() {
  return (
    <footer id={styles.Footer}>
      <div>
        <div className={styles.Footer_title}>
          <h2 className={metamorphous.className}>BreadBase</h2>
          <p>BreadBase &copy; 2024</p>
        </div>
        <div className={styles.Footer_links}>
          <Link href='/Search/Bakery'>Find a Bakery</Link>
          <p>{' / '}</p>
          <Link href='/Bakery/SignUp'>Register a Bakery</Link>
        </div>
      </div>
    </footer>
  );
}
