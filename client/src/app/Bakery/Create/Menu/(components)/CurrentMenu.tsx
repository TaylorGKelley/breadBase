'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DividerLine from '@/components/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';
import { Arrow } from '@/components/icons';
import Link from 'next/link';
import Product from '@/types/Product';
import useAuthStore from '@/store/useAuthStore';

type CurrentMenuProps = {};

function CurrentMenu({}: CurrentMenuProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [items, setItems] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.API_URL || 'http://localhost:5001/api/v1'}/product/all/${user?.associatedBakery}`,
      {
        credentials: 'include',
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data.products);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className='relative flex h-[500px] w-full max-w-96 flex-col rounded-3xl border p-4'>
        <DividerLine className={`${metamorphous.className} text-lg`}>
          Menu
        </DividerLine>
        {!isLoading ? (
          <ul className='scroll-narrow flex-grow overflow-y-auto'>
            {items?.map((item, i) => (
              <li
                key={i}
                onClick={() =>
                  router.push(`/Bakery/Create/Menu?productId=${item._id}`)
                }
                className='flex cursor-pointer justify-between'
              >
                <span>{item.name}</span>
                <span>{`$${item.price}`}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className='scroll-narrow flex-grow'>
            <li>loading...</li>
          </ul>
        )}
        <div className='px-2 py-3'>
          <button
            onClick={() => router.push('/Bakery/Create/Menu?itemId=New')}
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
