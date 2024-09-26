'use client';

import { createProduct } from '@/actions/manageProducts';
import Form from '@/components/Forms/Form';
import Input from '@/components/Forms/Input';
import TextArea from '@/components/Forms/TextArea';
import type CreateProductFormState from '@/types/FormStates/CreateProductFormState';
import React, { useState } from 'react';
import ImageInput from '../../../../../components/Forms/ImageInput';

type NewItemViewProps = {};

function NewItemView({}: NewItemViewProps) {
  const [formState, setFormState] = useState<CreateProductFormState>({
    success: false,
    name: '',
    price: undefined,
  });

  return (
    <Form<CreateProductFormState>
      action={createProduct}
      setFormState={setFormState}
    >
      {formState.errors?.message && (
        <p className='text-xs text-red-400'>{formState.errors.message}</p>
      )}
      <Input
        type='text'
        id='name'
        label='Name:'
        required
        defaultValue={formState.name}
        error={formState.errors?.name}
      />
      <Input
        type='number'
        id='price'
        label='Price:'
        min={0}
        max={1000}
        required
        defaultValue={formState.price}
        error={formState.errors?.price}
      />
      <TextArea
        id='description'
        label='Description:'
        required
        defaultValue={formState.description}
        error={formState.errors?.description}
      />
      <ImageInput
        id='uploadImage'
        label='Image:'
        // required
      />
    </Form>
  );
}

export default NewItemView;
