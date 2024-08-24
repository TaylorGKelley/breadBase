import React from 'react';
import { handleLogin } from '../../actions/login';
import Input from '@/components/UI/Input';
import { metamorphous } from '@/ui/fonts';
import FormButton from '@/components/UI/FormButton';
import DividerLine from '@/components/UI/DividerLine';
import GoogleMonoIcon from '@/components/icons/GoogleMonoIcon';
import Link from 'next/link';

function Login() {
  return (
    <main className='grid grid-flow-row grid-cols-2 justify-items-center gap-6 max-md:grid-cols-1'>
      <section className='-mt-6 flex h-full w-full flex-col items-center justify-center px-4'>
        <h4 className={`${metamorphous.className} text-center`}>Login</h4>
        <form
          action={handleLogin}
          className='flex w-full max-w-96 flex-col gap-5 md:gap-8'
        >
          <Input
            type='text'
            id='email'
            label='Email:'
            placeholder='john.doe@example.com'
          />
          <Input
            type='password'
            id='password'
            label='Password:'
            placeholder='●●●●●●●●'
            displayForgotPassword
          />
          <div className='flex flex-col gap-3'>
            <FormButton className='border-yellow text-yellow hover:bg-yellow hover:text-white'>
              Sign in
            </FormButton>
            <DividerLine>or</DividerLine>
            <FormButton
              type='button'
              className='border-gray-400 text-gray-400 transition-all duration-300 hover:brightness-125'
            >
              <GoogleMonoIcon className='fill-gray-400' />
              Sign in with Google
            </FormButton>
            <Link
              href='/SignUp'
              className='text-center text-xs text-gray-400 underline'
            >
              Not a user? Sign up now!
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
