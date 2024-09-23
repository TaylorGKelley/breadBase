'use client';

import React, { Suspense, useState } from 'react';
import signup from '../../actions/signup';
import { metamorphous } from '../../ui/fonts';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import Input from '@/components/Forms/Input';
import Button from '@/components/Forms/Button';
import GoogleMonoIcon from '@/components/icons/GoogleMonoIcon';
import DividerLine from '@/components/Forms/DividerLine';
import Form from '@/components/Forms/Form';
import type { SignUpFormState } from '@/types/FormStates/AuthFormState';
import Link from 'next/link';
import useAuthStore from '@/store/useAuthStore';

export default function SignUp({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { loginUser } = useAuthStore();

  const redirectURL = (searchParams?.redirect as string)?.replace('%2F', '/');

  const [formState, setFormState] = useState<SignUpFormState>({
    success: false,
    firstName: '',
    lastName: '',
    email: '',
  });

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
          <p className='text-xs text-red-400'>
            {formState.errors?.message || ' '}
          </p>
          <Form<SignUpFormState>
            action={signup}
            setFormState={setFormState}
            onSuccess={(formState) => {
              if (formState.user) loginUser(formState.user);
            }}
            preferRedirect={redirectURL || '/SignUp/ExtraInfo'}
            className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
          >
            <div className='flex items-center gap-4 *:flex-grow'>
              <Input
                type='text'
                id='firstName'
                label='First Name:'
                placeholder='John'
                required
                defaultValue={formState.firstName}
                error={formState.errors?.firstName}
              />
              <Input
                type='text'
                id='lastName'
                label='Last Name:'
                placeholder='Doe'
                required
                defaultValue={formState.lastName}
                error={formState.errors?.lastName}
              />
            </div>
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
              minLength={8}
              error={formState.errors?.password}
            />
            <Input
              type='password'
              id='passwordConfirm'
              label='Password Confirm:'
              placeholder='●●●●●●●●'
              required
              minLength={8}
              error={formState.errors?.passwordConfirm}
            />
            <div className='flex flex-col gap-3'>
              <Button className='border-yellow text-yellow hover:bg-yellow disabled:hover:text-yellow hover:text-white disabled:hover:bg-transparent'>
                Sign up
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
                href={redirectURL ? `/Login?redirect=${redirectURL}` : '/Login'}
                className='text-center text-xs text-gray-400 underline'
              >
                Already a user? Login here!
              </Link>
            </div>
          </Form>
        </section>
      </main>
    </BackgroundImageContainer>
  );
}
