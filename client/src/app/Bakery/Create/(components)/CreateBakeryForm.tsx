import Button from '@/components/Form/Button';
import Form from '@/components/Form';
import Input from '@/components/Form/Input';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateBakerySchema,
  CreateBakerySchemaType,
} from '@/types/Schemas/CreateBakerySchema';
import { useRouter } from 'next/navigation';

function CreateBakeryForm() {
  const router = useRouter();
  const methods = useForm<CreateBakerySchemaType>({
    resolver: zodResolver(CreateBakerySchema),
  });

  const handleSubmit = async (data: FieldValues) => {
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/bakery`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const { error } = await response.json();
      methods.setError('root', { message: error });
      return;
    }

    router.push('/Bakery/Create/Menu');
  };

  return (
    <Form
      onSubmit={handleSubmit}
      methods={methods}
      className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
    >
      <Input
        name='title'
        label='Title:'
        placeholder='Title'
        required
      />
      <Input
        name='address'
        label='Address:'
        placeholder='123 Random Rd'
        required
      />
      <Input
        type='number'
        name='suiteNumber'
        label='Apartment/Suite Number:'
        placeholder='31'
      />
      <Input
        name='city'
        label='City:'
        placeholder='City'
        required
      />
      {/* // Todo: Replace this with dropdown/select element for states */}
      <Input
        name='state'
        label='State:'
        placeholder='State'
        required
      />
      <Input
        name='zipCode'
        label='Zip Code:'
        placeholder='00000'
        required
      />
      {methods.formState.errors.root && (
        <p className='text-red-500'>{methods.formState.errors.root?.message}</p>
      )}
      <Button className='border-yellow text-yellow'>Create</Button>
    </Form>
  );
}

export default CreateBakeryForm;
