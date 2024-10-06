import React from 'react';
import { metamorphous } from '../../ui/fonts';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import SignUpForm from './(components)/SignUpForm';

export default function SignUp() {
  return (
    <BackgroundImageContainer
      src='/images/Bread.png'
      alt='Background Image'
      className='before:bg-black/[70%] before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:backdrop-blur-0'
    >
      <main className='grid h-screen grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-y-auto bg-transparent md:grid-cols-2'>
        <section className='hmd:-mt-6 mt-20 flex w-full flex-col items-center justify-center px-4 pb-12'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Sign Up
          </h3>
          <SignUpForm />
        </section>
      </main>
    </BackgroundImageContainer>
  );
}
