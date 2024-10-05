'use client';

import DividerLine from '@/components/Archived/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';
import Button from '@/components/Archived/Forms/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductForm } from '@/types/ProductSchema';
import type { CreateProductFormType } from '@/types/ProductSchema';
import Form from '@/components/Form';
import Input from '@/components/Form/Input';
import TextArea from '@/components/Form/TextArea';
import ImageInput from '@/components/Form/ImageInput';
import Product from '@/types/Product';

type ProductFormProps = {
  product?: Product;
};

function ProductForm({ product }: ProductFormProps) {
  const productId = useSearchParams().get('productId');
  const router = useRouter();

  const methods = useForm<CreateProductFormType>({
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
      console.log('Created product!!', data);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      methods={methods}
      className='flex w-full max-w-96 flex-col gap-5 transition-all duration-500'
    >
      <div className='scroll-narrow h-[500px] w-full max-w-96 overflow-y-auto rounded-3xl border p-4'>
        <DividerLine className={`${metamorphous.className} text-lg`}>
          Add Item
        </DividerLine>
        <Input
          type='text'
          name='name'
          label='Name:'
          required
        />
        <Input
          type='text'
          name='price'
          label='Price:'
          min={0}
          max={1000}
          required
        />
        <TextArea
          name='description'
          label='Description:'
          required
        />
        <ImageInput
          name='image'
          label='Image:'
          required
        />
        <TextArea
          name='ingredients'
          label='Ingredients:'
          defaultHeightPx={75}
          bulletPoints
        />
      </div>
      <Button
        disabled={methods.formState.isSubmitting}
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
      {methods.formState.errors.root && (
        <p className='text-red-500'>{methods.formState.errors.root?.message}</p>
      )}
    </Form>
  );
}

export default ProductForm;
