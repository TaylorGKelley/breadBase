'use client';

import DividerLine from '@/components/Form/DividerLine';
import { metamorphous } from '@/ui/fonts';
import Button from '@/components/Form/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductForm } from '@/types/Schemas/ProductSchema';
import type { CreateProductFormType } from '@/types/Schemas/ProductSchema';
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
          image: product.image,
          ingredients: product.ingredients?.join('\n'),
        }
      : undefined,
    resolver: zodResolver(CreateProductForm),
  });

  const onSubmit = async (data: CreateProductFormType) => {
    // Default to create product
    const request = {
      url: `${process.env.API_URL || 'http://localhost:5001'}/api/v1/product`,
      method: 'POST',
    };

    if (product) {
      // PATCH - update request
      request.url = `${process.env.API_URL || 'http://localhost:5001'}/api/v1/product/${product._id}`;
      request.method = 'PATCH';
    }

    const response = await fetch(request.url, {
      method: request.method,
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
        ingredients: data.ingredients,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const { error } = await response.json();
      methods.setError('root', { message: error });
      return;
    }

    router.push('/Bakery/Create/Menu');
  };

  const handleDelete = () => {
    if (!productId) return;

    fetch(
      `${process.env.API_URL || 'http://localhost:5001'}/api/v1/product/${productId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    ).then(() => router.replace('/Bakery/Create/Menu'));
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
        {product && (
          <p
            className='cursor-pointer pt-4 text-center underline'
            onClick={handleDelete}
          >
            Delete Product
          </p>
        )}
      </div>
      {methods.formState.errors.root && (
        <p className='text-red-500'>{methods.formState.errors.root?.message}</p>
      )}
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
    </Form>
  );
}

export default ProductForm;
