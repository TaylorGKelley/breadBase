'use client';

import React from 'react';
import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useSelectedBakery from '../../../store/selectedBakery';
import { metamorphous } from '../../../ui/fonts';

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
            <Link href='/'>
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
