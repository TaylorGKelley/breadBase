'use client';

import Form from '@/components/Form';
import Button from '@/components/Form/Button';
import DividerLine from '@/components/Form/DividerLine';
import Input from '@/components/Form/Input';
import { GoogleMonoIcon } from '@/components/icons';
import {
  ExtraInfoSchema,
  ExtraInfoSchemaType,
} from '@/types/Schemas/ExtraInfoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

function ExtraInfoForm() {
  const router = useRouter();
  const methods = useForm<ExtraInfoSchemaType>({
    resolver: zodResolver(ExtraInfoSchema),
  });

  const onSubmit = (data: FieldValues) => {};

  return (
    <Form
      onSubmit={onSubmit}
      methods={methods}
      className='flex w-full max-w-96 flex-col gap-3 transition-all duration-500'
    >
      <Input
        name='phoneNumber'
        label='Phone Number:'
        placeholder='(123) 456-7890'
        required
      />
      <Input
        name='address'
        label='Address:'
        placeholder='123 Random Road'
        required
      />
      <Input
        type='number'
        name='apptNumber'
        label='Appartment/Suite Number:'
        placeholder='0'
        required
      />
      {/* // TODO: Make into SELECT Box */}
      <Input
        name='county'
        label='City:'
        placeholder='Philadelphia'
        required
      />
      <div className='flex items-center gap-4 *:flex-grow'>
        <Input
          name='state'
          label='State:'
          placeholder='PA'
          required
        />
        <Input
          type='number'
          name='zipCode'
          label='Zip Code:'
          placeholder='00000'
          required
        />
      </div>
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
          href='/Login'
          className='text-center text-xs text-gray-400 underline'
        >
          Already a user? Login here!
        </Link>
      </div>
    </Form>
  );
}

export default ExtraInfoForm;
