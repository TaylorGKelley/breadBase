import React from 'react';
import { handleLogin } from '../../actions/login';
import Input from '@/components/UI/Input';
import { metamorphous } from '@/ui/fonts';
import FormButton from '@/components/UI/FormButton';

function Login() {
  return (
    <main className='flex flex-row'>
      {/* TODO: How should this form be positioned?? */}
      <section className='mx-auto my-20 flex h-full w-fit flex-col items-center justify-start md:mx-14 lg:m-28 xl:m-36'>
        <h4 className={`${metamorphous.className} text-center`}>Login</h4>
        <form
          action={handleLogin}
          className='flex flex-col gap-5 md:gap-8'
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
          <FormButton>Sign in</FormButton>
        </form>
      </section>
    </main>
  );
}

export default Login;
