'use client';

import React, { useState } from 'react';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import NewItemView from './(components)/NewItemView';

function Menu() {
  const [currentProductId, setCurrentProductId] = useState();

  return (
    <BackgroundImageContainer
      src='/images/MenuBackground.png'
      alt='Background Image'
      className='before:bg-black/75 before:from-black/75 before:from-40% before:to-gray-900/65 before:to-90% before:backdrop-blur-sm sm:before:bg-transparent sm:before:bg-gradient-to-r'
    >
      <main className='flex h-full items-center justify-center bg-transparent'>
        <NewItemView />
      </main>
    </BackgroundImageContainer>
  );
}

export default Menu;
