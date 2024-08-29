import React from 'react';
import { signup } from '../../actions/signup';
import { metamorphous } from '../../ui/fonts';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import Input from '@/components/UI/Input';
import FormButton from '@/components/UI/FormButton';
import GoogleMonoIcon from '@/components/icons/GoogleMonoIcon';
import DividerLine from '@/components/UI/DividerLine';

export default function SignUp() {
  const handleSignUp = async (e: FormData) => {
    'use server';
    const firstName = e.get('firstName');
    const lastName = e.get('lastName');
    const email = e.get('email');
    const password = e.get('password');

    if (!firstName || !lastName || !email || !password)
      return 'Required fields are invalid';

    // Handle signup
    const response = await signup(firstName, lastName, email, password);

    return 'success';
  };

  return (
    <BackgroundImageContainer
      src='/images/Bread.png'
      alt='Background Image'
      className='before:bg-black/[70%] before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:backdrop-blur-0'
    >
      <main className='grid h-full grid-flow-row grid-cols-1 justify-items-center gap-5 bg-transparent py-5 md:grid-cols-2'>
        <section className='hmd:-mt-6 mt-0 flex h-full w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Sign Up
          </h3>
          <form
            action={handleSignUp}
            className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500 md:gap-8'
          >
            <div className='flex items-center gap-4 *:flex-grow'>
              <Input
                type='text'
                id='firstName'
                label='First Name:'
                placeholder='John'
                required
              />
              <Input
                type='text'
                id='lastName'
                label='Last Name:'
                placeholder='Doe'
                required
              />
            </div>
            <Input
              type='email'
              id='email'
              label='Email:'
              placeholder='john.doe@example.com'
              required
            />
            <Input
              type='password'
              id='password'
              label='Password:'
              placeholder='●●●●●●●●'
              required
            />
            <Input
              type='password'
              id='passwordConfirm'
              label='Password Confirm:'
              placeholder='●●●●●●●●'
              required
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
            </div>
          </form>
        </section>
      </main>
    </BackgroundImageContainer>
  );
}
