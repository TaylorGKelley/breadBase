'use client';

import React, { useEffect, useState } from 'react';
import styles from './NavTitle.module.css';
import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useSelectedBakery from '@/app/store/selectedBakery';
import { metamorphous } from '@/app/ui/fonts';

export default function NavTitle() {
  const { id, title } = useSelectedBakery();
  const isBakerySelected = id > 0;

  return (
    <TransitionGroup>
      <CSSTransition
        key={isBakerySelected ? 'loaded' : 'loading'}
        timeout={1000}
        className='fade-transition'
      >
        {isBakerySelected ? (
          <div className={styles.NavTitle_titleContainer}>
            <p className={styles.NavTitle_selectedHeader}>Selected:</p>
            <Link href={`/BakeryHome/${id}`}>
              <h5
                className={`${metamorphous.className} ${styles.NavTitle_title}`}
              >
                {title}
              </h5>
            </Link>
          </div>
        ) : (
          <div className={styles.NavTitle_titleContainer}>
            <Link href='/'>
              <h4
                className={`${metamorphous.className} ${styles.NavTitle_title}`}
              >
                BreadBase
              </h4>
            </Link>
          </div>
        )}
      </CSSTransition>
    </TransitionGroup>
  );
}
