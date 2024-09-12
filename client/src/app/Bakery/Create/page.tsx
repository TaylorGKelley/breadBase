'use client';

import createBakery from '@/actions/createBakery';
import BackgroundImageContainer from '@/components/BackgroundImageContainer';
import AuthForm from '@/components/UI/Forms/AuthForm';
import Button from '@/components/UI/Forms/Button';
import Input from '@/components/UI/Forms/Input';
import CreateBakeryFormState from '@/types/CreateBakeryFormState';
import { metamorphous } from '@/ui/fonts';
import CheckBakerStatus from '@/wrappers/CheckBakerStatus';
import React, { useState } from 'react';

function Create() {
  const [formState, setFormState] = useState<CreateBakeryFormState>({
    success: false,
    title: '',
    address: '',
    suiteNumber: 0,
    city: '',
    state: '',
    zipCode: 0,
  });

  return (
    <BackgroundImageContainer
      src='/images/CreateBakery.png'
      alt='Background Image'
      className='before:bg-black/80 before:backdrop-blur-sm before:transition-all before:duration-500 before:lg:bg-gradient-to-r before:lg:from-black/40 before:lg:from-30% before:lg:to-gray-900/0 before:lg:to-70% before:lg:backdrop-blur-0'
    >
      <main className='grid h-screen min-h-fit grid-flow-row grid-cols-1 justify-items-center gap-5 overflow-auto bg-transparent pb-8 pt-20 md:grid-cols-2'>
        <section className='hmd:-mt-6 mb-6 flex w-full flex-col items-center justify-center px-4'>
          <h3 className={`${metamorphous.className} mb-4 text-center`}>
            Create Bakery
          </h3>
          <AuthForm<CreateBakeryFormState>
            action={createBakery}
            setFormState={setFormState}
            className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
          >
            <Input
              id='title'
              label='Title:'
              placeholder='Title'
              required
              defaultValue={formState.title}
              error={formState.errors?.title}
            />
            <Input
              id='address'
              label='Address:'
              placeholder='123 Random Rd'
              required
              defaultValue={formState.address}
              error={formState.errors?.address}
            />
            <Input
              type='number'
              id='suiteNumber'
              label='Apartment/Suite Number:'
              placeholder='0'
              defaultValue={formState.suiteNumber}
              error={formState.errors?.suiteNumber}
            />
            {/* // Todo: Replace this with dropdown/select element */}
            <Input
              id='state'
              label='State:'
              placeholder='State'
              required
              defaultValue={formState.state}
              error={formState.errors?.state}
            />
            <Input
              id='city'
              label='City:'
              placeholder='City'
              required
              defaultValue={formState.city}
              error={formState.errors?.city}
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
            <Button className='border-yellow text-yellow'>Create</Button>
          </AuthForm>
        </section>
      </main>
    </BackgroundImageContainer>
  );
}

export default Create;
