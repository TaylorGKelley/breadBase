import React from 'react';
import { metamorphous } from '@/ui/fonts';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import LoginForm from './(components)/LoginForm';

function Login() {
  return (
    <BackgroundImageContainer
      src='/images/Bread.png'
      alt='Background Image'
      className='before:bg-black/[70%] before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:backdrop-blur-0'
    >
      <main className='grid h-screen min-h-fit grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-auto bg-transparent pb-8 pt-20 md:grid-cols-2'>
        <section className='hmd:-mt-6 mb-6 flex w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} text-center`}>Login</h3>
          <LoginForm />
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default Login;
