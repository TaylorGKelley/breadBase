'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/UI/Forms/Input';
import { metamorphous } from '@/ui/fonts';
import Button from '@/components/UI/Forms/Button';
import DividerLine from '@/components/UI/Forms/DividerLine';
import GoogleMonoIcon from '@/components/icons/GoogleMonoIcon';
import Link from 'next/link';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import { LoginFormState } from '@/types/AuthFormState';
import login from '@/actions/login';
import AuthForm from '@/components/UI/Forms/AuthForm';

function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const redirectURL = (searchParams?.redirect as string)?.replace('%2F', '/');

  const [formState, setFormState] = useState<LoginFormState>({
    success: false,
    email: '',
  });

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  return (
    <BackgroundImageContainer
      src='/images/Bread.png'
      alt='Background Image'
      className='before:bg-black/[70%] before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:backdrop-blur-0'
    >
      <main className='grid h-screen min-h-fit grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-auto bg-transparent pb-8 pt-20 md:grid-cols-2'>
        <section className='hmd:-mt-6 mb-6 flex w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} text-center`}>Login</h3>
          <AuthForm<LoginFormState>
            preferRedirect={redirectURL}
            action={login}
            setFormState={setFormState}
            className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
          >
            {formState.errors && (
              <p className='text-xs text-red-400'>{formState.errors.message}</p>
            )}
            <Input
              type='email'
              id='email'
              label='Email:'
              placeholder='john.doe@example.com'
              required
              defaultValue={formState.email}
              error={formState.errors?.email}
            />
            <Input
              type='password'
              id='password'
              label='Password:'
              placeholder='●●●●●●●●'
              required
              displayForgotPassword
              error={formState.errors?.password}
            />
            <div className='flex flex-col gap-3'>
              <Button className='border-yellow text-yellow hover:bg-yellow disabled:hover:text-yellow hover:text-white disabled:hover:bg-transparent'>
                Sign in
              </Button>
              <DividerLine>or</DividerLine>
              <Button
                type='button'
                className='border-gray-400 text-gray-400 transition-all duration-300 hover:brightness-125 disabled:hover:brightness-100'
              >
                <GoogleMonoIcon className='fill-gray-400' />
                Sign in with Google
              </Button>
              <Link
                href='/SignUp'
                className='text-center text-xs text-gray-400 underline'
              >
                Not a user? Sign up now!
              </Link>
            </div>
          </AuthForm>
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default Login;
