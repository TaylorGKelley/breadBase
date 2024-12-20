'use client';

import React from 'react';
import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useSelectedBakery from '../../store/useSelectedBakery';
import { metamorphous } from '../../ui/fonts';
import useMenuOpen from '@/hooks/useMenuOpen';

type NavTitleProps = {};

export default function NavTitle({}: NavTitleProps) {
  const { setMenuOpen } = useMenuOpen();
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
          <div>
            <p className='text-gray-300'>Selected:</p>
            <Link href={`/BakeryHome/${id}`}>
              <h5
                className={`${metamorphous.className} text-nowrap text-white`}
              >
                {title}
              </h5>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              href='/'
              onClick={() => setMenuOpen(false)}
            >
              <h4
                className={`${metamorphous.className} text-nowrap text-white`}
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
