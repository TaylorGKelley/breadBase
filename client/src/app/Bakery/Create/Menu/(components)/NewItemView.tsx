'use client';

import { createProduct, updateProduct } from '@/actions/manageProducts';
import Form from '@/components/Forms/Form';
import Input from '@/components/Forms/Input';
import TextArea from '@/components/Forms/TextArea';
import type CreateProductFormState from '@/types/FormStates/CreateProductFormState';
import React, { useEffect, useState } from 'react';
import ImageInput from '../../../../../components/Forms/ImageInput';
import DividerLine from '@/components/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';
import Button from '@/components/Forms/Button';
import { useRouter, useSearchParams } from 'next/navigation';

type NewItemViewProps = {};

function NewItemView({}: NewItemViewProps) {
  const productId = useSearchParams().get('productId');
  const router = useRouter();

  const [formState, setFormState] = useState<CreateProductFormState>({
    success: false,
    name: '',
    price: undefined,
  });

  useEffect(() => {
    if (productId)
      fetch(
        `${process.env.API_URL || 'http://localhost:5001/api/v1'}/product/${productId}`,
        {
          credentials: 'include',
        },
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFormState({
            ...data.data.product,
            ingredients: data.data.product.ingredients.join(''),
          });
        });
  }, [productId]);

  return (
    <Form<CreateProductFormState>
      // action={!productId ? createProduct : updateProduct(productId)}
      action={}
      setFormState={setFormState}
      preferRedirect='/Bakery/Create/Menu'
      className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
    >
      <div className='scroll-narrow h-[500px] w-full max-w-96 overflow-y-auto rounded-3xl border p-4'>
        <DividerLine className={`${metamorphous.className} text-lg`}>
          Add Item
        </DividerLine>
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
          id='image'
          label='Image:'
        />
        <TextArea
          id='ingredients'
          label='Ingredients:'
          defaultHeightPx={75}
          bulletPoints
          defaultValue={formState.description}
          error={formState.errors?.description}
        />
      </div>
      <Button className='border-yellow text-yellow'>
        {!productId ? 'Add Item' : 'Save'}
      </Button>
      <button
        type='button'
        onClick={() => router.push('/Bakery/Create/Menu')}
        className='flex h-10 items-center justify-center rounded-full border border-gray-300 px-6 text-center text-gray-300'
      >
        Back
      </button>
    </Form>
  );
}

export default NewItemView;
