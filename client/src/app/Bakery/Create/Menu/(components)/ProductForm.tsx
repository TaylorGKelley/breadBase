'use client';

import DividerLine from '@/components/Archived/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';
import Button from '@/components/Archived/Forms/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductForm } from '@/types/ProductSchema';
import type { CreateProductFormType } from '@/types/ProductSchema';

type ProductFormProps = {
  product?: Product;
};

function ProductForm({ product }: ProductFormProps) {
  const productId = useSearchParams().get('productId');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormType>({
    defaultValues: product
      ? {
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.images?.at(0)?.image,
          ingredients: product.ingredients?.join('\n'),
        }
      : undefined,
    resolver: zodResolver(CreateProductForm),
  });

  const onSubmit = async (data: CreateProductFormType) => {
    if (product) {
      // PATCH request
      console.log(`Product with id -- ${product._id} -- is updated!!`, data);
    } else {
      // POST request
      console.log('Success!', data);
      console.log(errors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
    >
      <div className='scroll-narrow h-[500px] w-full max-w-96 overflow-y-auto rounded-3xl border p-4'>
        <DividerLine className={`${metamorphous.className} text-lg`}>
          Add Item
        </DividerLine>
        <FormField
          type='text'
          placeholder='Name'
          name='name'
          register={register}
          error={errors.name}
        />
        <FormField
          type='text'
          placeholder='$0.00'
          name='price'
          register={register}
          error={errors.price}
        />
      </div>
      <Button
        disabled={isSubmitting}
        className='border-yellow text-yellow'
      >
        {!productId ? 'Add Item' : 'Save'}
      </Button>
      <button
        type='button'
        onClick={() => router.push('/Bakery/Create/Menu')}
        className='flex h-10 items-center justify-center rounded-full border border-gray-300 px-6 text-center text-gray-300'
      >
        Back
      </button>
      {errors.root && <p className='text-red-500'>{errors.root?.message}</p>}
    </form>
  );
}

import { FieldError, UseFormRegister } from 'react-hook-form';
import Product from '@/types/Product';
import React from 'react';

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  registerOptions?: RegisterOptions;
};

function FormField({
  type = 'text',
  placeholder,
  name,
  register,
  error,
  registerOptions,
}: FormFieldProps) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className='rounded-full px-4 py-3 text-black'
      />
      {error && (
        <span className='block text-red-600'>
          {(error as FieldError).message}
        </span>
      )}
    </>
  );
}

export default ProductForm;
