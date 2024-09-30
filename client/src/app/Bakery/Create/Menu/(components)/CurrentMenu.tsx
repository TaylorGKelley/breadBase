'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DividerLine from '@/components/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';
import { Arrow } from '@/components/icons';
import useAuthStore from '@/store/useAuthStore';

type CurrentMenuProps = {};

function CurrentMenu({}: CurrentMenuProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const items = [{ id: 'blah' }];

  return (
    <>
      <div className='relative flex h-[500px] w-full max-w-96 flex-col rounded-3xl border p-4'>
        <DividerLine className={`${metamorphous.className} text-lg`}>
          Menu
        </DividerLine>
        {/* This div needs to scale to fill container hieght */}
        <ul className='scroll-narrow flex-grow overflow-y-auto'>
          {items.map((item, i) => (
            <li
              key={i}
              onClick={() =>
                router.push(`/Bakery/Create/Menu?itemId=${item.id}`)
              }
              className='flex justify-between'
            >
              <span>text</span>
              <span>$0.00</span>
            </li>
          ))}
        </ul>
        <div className='px-2 py-3'>
          <button
            onClick={() => router.push('/Bakery/Create/Menu?itemId=New')}
            className='inline-block w-full rounded-full border p-2'
          >
            Add Item
          </button>
        </div>
      </div>
      <div className='flex w-full max-w-96 justify-between py-6 *:w-12'>
        <button
          className='flex aspect-square items-center justify-center rounded-full border'
          onClick={() =>
            router.push('/Bakery/Create?bakeryId=' + user?.associatedBakery)
          }
        >
          <Arrow left />
        </button>
        <button
          className='flex aspect-square items-center justify-center rounded-full border'
          onClick={() => router.push('/Bakery/Dashboard')}
        >
          <Arrow />
        </button>
      </div>
    </>
  );
}

export default CurrentMenu;
