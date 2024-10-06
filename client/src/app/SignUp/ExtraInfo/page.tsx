import React from 'react';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import type { ExtraInfoSignUpFormState } from '@/types/FormStates/AuthFormState';
import { metamorphous } from '@/ui/fonts';
import ExtraInfoForm from './(components)/ExtraInfoForm';

function ExtraInfo() {
  return (
    <BackgroundImageContainer
      src='/images/bakeryStoreFront.png'
      alt='Background Image'
      className='before:bg-black/[75%] before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:backdrop-blur-0'
    >
      <main className='grid h-screen grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-auto bg-transparent md:grid-cols-2'>
        <section className='hmd:-mt-6 mb-6 mt-20 flex w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Extra Info
          </h3>
          <ExtraInfoForm />
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default ExtraInfo;
