'use client';

import React, { useState } from 'react';
import signup from '../../actions/signup';
import { metamorphous } from '../../ui/fonts';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import Input from '@/components/UI/Forms/Input';
import Button from '@/components/UI/Forms/Button';
import GoogleMonoIcon from '@/components/icons/GoogleMonoIcon';
import DividerLine from '@/components/UI/Forms/DividerLine';
import AuthForm from '@/components/UI/Forms/AuthForm';
import { AuthWithAttempts, SignUpFormState } from '@/types/AuthFormState';
import Link from 'next/link';

export default function SignUp() {
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
      <main className='grid h-screen grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-auto bg-transparent md:grid-cols-2'>
        <section className='hmd:-mt-6 mb-6 mt-20 flex w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Sign Up
          </h3>
          <p className='text-xs text-red-400'>
            {formState.errors?.message || ' '}
          </p>
          <AuthForm<SignUpFormState>
            action={signup}
            setFormState={setFormState}
            className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
          >
            <div className='flex items-center gap-4 *:flex-grow'>
              <Input
                type='text'
                id='firstName'
                label='First Name:'
                placeholder='John'
                // required
                defaultValue={formState.firstName}
                error={formState.errors?.firstName}
              />
              <Input
                type='text'
                id='lastName'
                label='Last Name:'
                placeholder='Doe'
                // required
                defaultValue={formState.lastName}
                error={formState.errors?.lastName}
              />
            </div>
            <Input
              type='email'
              id='email'
              label='Email:'
              placeholder='john.doe@example.com'
              // required
              defaultValue={formState.email}
              error={formState.errors?.email}
            />
            <Input
              type='password'
              id='password'
              label='Password:'
              placeholder='●●●●●●●●'
              // required
              // minLength={8}
              error={formState.errors?.password}
            />
            <Input
              type='password'
              id='passwordConfirm'
              label='Password Confirm:'
              placeholder='●●●●●●●●'
              // required
              // minLength={8}
              error={formState.errors?.passwordConfirm}
            />
            <div className='flex flex-col gap-3'>
              <Button className='border-yellow text-yellow hover:bg-yellow hover:text-white'>
                Sign up
              </Button>
              <DividerLine>or</DividerLine>
              <Button
                type='button'
                className='border-gray-400 text-gray-400 transition-all duration-300 hover:brightness-125'
              >
                <GoogleMonoIcon className='fill-gray-400' />
                Sign in with Google
              </Button>
              <Link
                href='/Login'
                className='text-center text-xs text-gray-400 underline'
              >
                Already a user? Login here!
              </Link>
            </div>
          </AuthForm>
        </section>
      </main>
    </BackgroundImageContainer>
  );
}
