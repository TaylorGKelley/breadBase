'use client';

import { extraInfo } from '@/actions/signup';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import GoogleMonoIcon from '@/components/icons/GoogleMonoIcon';
import Form from '@/components/Archived/Forms/Form';
import Button from '@/components/Archived/Forms/Button';
import DividerLine from '@/components/Archived/Forms/DividerLine';
import Input from '@/components/Archived/Forms/Input';
import type { ExtraInfoSignUpFormState } from '@/types/FormStates/AuthFormState';
import { metamorphous } from '@/ui/fonts';
import Link from 'next/link';
import React, { useState } from 'react';

function ExtraInfo() {
  const [formState, setFormState] = useState<ExtraInfoSignUpFormState>({
    success: false,
    phoneNumber: '',
    address: '',
    apptNumber: 0,
    state: '',
    county: '',
    zipCode: 0,
  });

  return (
    <BackgroundImageContainer
      src='/images/bakeryStoreFront.png'
      alt='Background Image'
      className='before:bg-black/[75%] before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:backdrop-blur-0'
    >
      <main className='grid h-screen grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-auto bg-transparent md:grid-cols-2'>
        <section className='hmd:-mt-6 mb-6 mt-20 flex w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} mb-3 text-center`}>
            Extra Info
          </h3>
          <p className='text-xs text-red-400'>
            {formState.errors?.message || ' '}
          </p>
          <Form<ExtraInfoSignUpFormState>
            action={extraInfo}
            setFormState={setFormState}
            preferRedirect='/SignUp/ExtraInfo'
            className='flex w-full max-w-96 flex-col gap-3 transition-all duration-500'
          >
            <Input
              type='text'
              id='phoneNumber'
              label='Phone Number:'
              placeholder='(123) 456-7890'
              required
              defaultValue={formState.phoneNumber}
              error={formState.errors?.phoneNumber}
            />
            <Input
              type='text'
              id='address'
              label='Address:'
              placeholder='123 Random Road'
              required
              defaultValue={formState.address}
              error={formState.errors?.address}
            />
            <Input
              type='number'
              id='apptNumber'
              label='Appartment/Suite Number:'
              placeholder='0'
              required
              defaultValue={formState.apptNumber}
              error={formState.errors?.apptNumber}
            />
            {/* // TODO: Make into SELECT Box */}
            <Input
              type='text'
              id='state'
              label='State:'
              required
              defaultValue={formState.state}
              error={formState.errors?.state}
            />
            <div className='flex items-center gap-4 *:flex-grow'>
              <Input
                type='text'
                id='county'
                label='Montgomery:'
                placeholder='john.doe@example.com'
                required
                defaultValue={formState.county}
                error={formState.errors?.county}
              />
              <Input
                type='number'
                id='zipCode'
                label='Zip Code:'
                placeholder='00000'
                required
                defaultValue={formState.zipCode}
                error={formState.errors?.zipCode}
              />
            </div>
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
                href='/Login'
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

export default ExtraInfo;
