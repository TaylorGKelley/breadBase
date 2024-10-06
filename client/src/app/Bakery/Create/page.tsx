'use client';

import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import CreateBakeryFormState from '@/types/FormStates/CreateBakeryFormState';
import { metamorphous } from '@/ui/fonts';
import React, { useState } from 'react';
import CreateBakeryForm from './(components)/CreateBakeryForm';

function Create() {
  return (
    <BackgroundImageContainer
      src='/images/CreateBakery.png'
      alt='Background Image'
      className='before:bg-black/80 before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:bg-gradient-to-r before:lg:from-black/40 before:lg:from-30% before:lg:to-gray-900/0 before:lg:to-70% before:lg:backdrop-blur-0'
    >
      <main className='grid h-screen min-h-fit grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-auto bg-transparent pb-8 pt-20 md:grid-cols-2'>
        <section className='hmd:-mt-6 mb-6 flex w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} mb-4 text-center`}>
            Create Bakery
          </h3>
          <CreateBakeryForm />
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default Create;
