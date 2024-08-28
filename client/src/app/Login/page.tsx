import React from 'react';
import { handleLogin } from '../../actions/login';
import Input from '@/components/UI/Input';
import { metamorphous } from '@/ui/fonts';
import FormButton from '@/components/UI/FormButton';
import DividerLine from '@/components/UI/DividerLine';
import GoogleMonoIcon from '@/components/icons/GoogleMonoIcon';
import Link from 'next/link';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';

function Login() {
  return (
    <BackgroundImageContainer
      src='/images/Bread.png'
      alt='Background Image'
      className='before:bg-black/[70%] before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:backdrop-blur-0'
    >
      <main className='grid h-full grid-flow-row grid-cols-1 justify-items-center gap-5 bg-transparent py-5 md:grid-cols-2'>
        <section className='hmd:-mt-6 mt-0 flex h-full w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Login
          </h3>
          <form
            action={handleLogin}
            className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500 md:gap-8'
          >
            <Input
              type='email'
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
    </BackgroundImageContainer>
  );
}

export default Login;
