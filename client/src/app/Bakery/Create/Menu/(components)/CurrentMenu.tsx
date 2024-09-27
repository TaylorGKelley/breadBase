'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DividerLine from '@/components/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';

type CurrentMenuProps = {};

function CurrentMenu({}: CurrentMenuProps) {
  const router = useRouter();

  const items = [{ id: 'blah' }];

  return (
    <div className='relative flex h-[500px] w-full max-w-96 flex-col rounded-3xl border p-4'>
      <DividerLine className={`${metamorphous.className} text-lg`}>
        Menu
      </DividerLine>
      {/* This div needs to scale to fill container hieght */}
      <ul className='scroll-narrow flex-grow overflow-y-auto'>
        {items.map((item, i) => (
          <li
            key={i}
            onClick={() => router.push(`/Bakery/Create/Menu?itemId=${item.id}`)}
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
  );
}

export default CurrentMenu;
