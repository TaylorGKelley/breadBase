'use client';

import DividerLine from '@/components/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';
import Button from '@/components/Forms/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormData, FormFieldProps } from '@/types/Forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@/types/ProductSchema';

type NewItemFormProps = {};

function NewItemForm({}: NewItemFormProps) {
  const productId = useSearchParams().get('productId');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log('Success!', data);
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
        {'' && (
          <p className='text-xs text-red-400'>{'formState.errors.message'}</p>
        )}
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
          valueAsNumber
          register={register}
          error={errors.price}
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
    </form>
  );
}

function FormField({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}: FormFieldProps) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className='color-black'
      />
      {error && <span className='text-red-600'></span>}
    </>
  );
}

export default NewItemForm;
