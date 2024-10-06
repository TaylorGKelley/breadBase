import Form from '@/components/Form';
import Button from '@/components/Form/Button';
import DividerLine from '@/components/Form/DividerLine';
import Input from '@/components/Form/Input';
import { GoogleMonoIcon } from '@/components/icons';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import React from 'react';
import { FieldValues } from 'react-hook-form';

function LoginForm() {
  const { loginUser } = useAuthStore();

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      return responseData.error;
    }

    loginUser(response.user);
  };

  return (
    <Form className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'>
      {formState.errors && (
        <p className='text-xs text-red-400'>{formState.errors.message}</p>
      )}
      <Input
        type='email'
        name='email'
        label='Email:'
        placeholder='john.doe@example.com'
        required
      />
      <PasswordInput
        type='password'
        id='password'
        label='Password:'
        placeholder='●●●●●●●●'
        required
        displayForgotPassword
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
    </Form>
  );
}

export default LoginForm;
