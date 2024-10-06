'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DividerLine from '@/components/Archived/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';
import { Arrow } from '@/components/icons';
import Link from 'next/link';
import Product from '@/types/Product';

type CurrentMenuProps = {
  products: Product[];
};

function CurrentMenu({ products }: CurrentMenuProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      <div className='relative flex h-[500px] w-full max-w-96 flex-col rounded-3xl border p-4'>
        <DividerLine className={`${metamorphous.className} text-lg`}>
          Menu
        </DividerLine>
        <ul className='scroll-narrow flex flex-grow flex-col overflow-y-auto even:*:bg-gray-700/50'>
          {products.length > 0 &&
            products?.map((product, i) => (
              <li
                key={i}
                onClick={() =>
                  router.push(`/Bakery/Create/Menu?productId=${product._id}`)
                }
                className='cursor-pointer rounded-xl px-4 py-3'
              >
                <div className='flex justify-between'>
                  <span>{product.name}</span>
                  <span>{`$${product.price}`}</span>
                </div>
              </li>
            ))}
        </ul>
        <div className='px-2 py-3'>
          <button
            onClick={() => router.push('/Bakery/Create/Menu?productId=New')}
            className='inline-block w-full rounded-full border p-2'
          >
            Add Item
          </button>
        </div>
      </div>
      <div className='grid w-full max-w-96 grid-cols-3 py-6 *:w-12'>
        <Link
          href='/Bakery/Dashboard'
          className='col-start-2 h-min self-center justify-self-center text-center underline'
        >
          skip
        </Link>
        <button
          className='flex aspect-square items-center justify-center justify-self-end rounded-full border'
          onClick={() => router.push('/Bakery/Dashboard')}
        >
          <Arrow />
        </button>
      </div>
    </>
  );
}

export default CurrentMenu;
