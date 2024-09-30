'use client';

import React from 'react';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import NewItemView from './(components)/NewItemView';
import { metamorphous } from '@/ui/fonts';
import CurrentMenu from './(components)/CurrentMenu';
import NewItemForm from './(components)/Test_NewItemForm';

type MenuProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function Menu({ searchParams }: MenuProps) {
  const productId = searchParams && searchParams['productId'];

  return (
    <BackgroundImageContainer
      src='/images/MenuBackground.png'
      alt='Background Image'
      className='before:bg-black/75 before:from-black/75 before:from-40% before:to-gray-900/65 before:to-90% before:backdrop-blur-sm sm:before:bg-transparent sm:before:bg-gradient-to-r'
    >
      <main className='grid h-screen grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-y-auto bg-transparent md:grid-cols-2'>
        <section className='mt-20 flex w-full flex-col items-center justify-center px-4 pb-12'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Create Menu
          </h3>
          {/* {!productId ? <CurrentMenu /> : <NewItemView />} */}
          {!productId ? <CurrentMenu /> : <NewItemForm />}
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default Menu;
