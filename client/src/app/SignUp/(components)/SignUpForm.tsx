'use client';

import Form from '@/components/Form';
import Button from '@/components/Form/Button';
import DividerLine from '@/components/Form/DividerLine';
import Input from '@/components/Form/Input';
import PasswordInput from '@/components/Form/PasswordInput';
import { GoogleMonoIcon } from '@/components/icons';
import useAuthStore from '@/store/useAuthStore';
import { SignUpSchema } from '@/types/Schemas/SignUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

function SignUpForm() {
  const { loginUser } = useAuthStore();
  const router = useRouter();
  const redirectURL = useSearchParams()
    .get('redirect')
    ?.toString()
    .replace('%2F', '/');

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/signup`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          displayName: data.firstName + ' ' + data.lastName,
        }),
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      methods.setError('root', { message: responseData.error });
      return;
    }

    loginUser(responseData.data.user);

    router.push(redirectURL || '/SignUp/ExtraInfo');
  };

  return (
    <Form
      onSubmit={onSubmit}
      methods={methods}
      className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
    >
      <div className='flex items-center gap-4 *:flex-grow'>
        <Input
          type='text'
          name='firstName'
          label='First Name:'
          placeholder='John'
          required
        />
        <Input
          type='text'
          name='lastName'
          label='Last Name:'
          placeholder='Doe'
          required
        />
      </div>
      <Input
        type='email'
        name='email'
        label='Email:'
        placeholder='john.doe@example.com'
        required
      />
      <PasswordInput
        type='password'
        name='password'
        label='Password:'
        placeholder='●●●●●●●●'
        required
        minLength={8}
      />
      <PasswordInput
        name='passwordConfirm'
        label='Password Confirm:'
        placeholder='●●●●●●●●'
        required
        minLength={8}
      />
      {methods.formState.errors['root'] && (
        <p className='text-xs text-red-400'>
          {methods.formState.errors['root']?.message || ' '}
        </p>
      )}
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
  );
}

export default SignUpForm;
