'use client';

import AddressModal from '@/components/AddressModal';
import Form from '@/components/Form';
import Button from '@/components/Form/Button';
import DividerLine from '@/components/Form/DividerLine';
import Input from '@/components/Form/Input';
import { GoogleMonoIcon, Location } from '@/components/icons';
import {
  ExtraInfoSchema,
  ExtraInfoSchemaType,
} from '@/types/Schemas/ExtraInfoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

function ExtraInfoForm() {
  const router = useRouter();
  const methods = useForm<ExtraInfoSchemaType>({
    resolver: zodResolver(ExtraInfoSchema),
  });
  const addressModalRef = useRef<HTMLDialogElement>(null);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number }>();

  const onSubmit = async (data: FieldValues) => {
    // TODO: Check for address confirmation

    // * lat lng set? addressVerified: true

    // const response = await fetch(
    //   `${process.env.API_URL || 'http://localhost:5001'}/api/v1/signup/extraInfo`,
    //   {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   },
    // );

    // const responseData = await response.json();

    // if (!response.ok) {
    //   methods.setError('root', { message: responseData.error });
    //   return;
    // }

    router.push('/Account');
  };

  return (
    <>
      <AddressModal
        methods={methods}
        onSelect={(address: Address) => {
          addressModalRef.current?.close();

          // Set latitude and longitude
          if (address.lat && address.lng) {
            console.log({ lat: address.lat, lng: address.lng });
            setLatLng({ lat: address.lat, lng: address.lng });
          }
        }}
        currentAddressState={{
          address: methods.watch('address'),
          suiteNumber: Number(methods.watch('suiteNumber')),
          city: methods.watch('city'),
          state: methods.watch('state'),
          zipCode: Number(methods.watch('zipCode')),
        }}
        ref={addressModalRef}
      />
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
          ActionButton={
            <button
              type='button'
              onClick={() => addressModalRef.current?.showModal()}
              className='absolute right-0 top-1/2 flex h-full w-12 -translate-y-1/2 items-center justify-center rounded-full pr-2 outline-none transition-all focus:brightness-75'
            >
              <Location width='0.9rem' />
            </button>
          }
        />
        <Input
          type='number'
          name='suiteNumber'
          label='Appartment/Suite Number:'
          placeholder='0'
          required
        />
        {/* // TODO: Make into SELECT Box */}
        <Input
          name='city'
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
        <div className='mt-2 flex flex-col gap-3'>
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
    </>
  );
}

export default ExtraInfoForm;
