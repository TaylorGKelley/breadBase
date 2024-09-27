'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DividerLine from '@/components/Forms/DividerLine';
import { metamorphous } from '@/ui/fonts';

function CurrentMenu() {
  const router = useRouter();

  const items = [{ id: 'blah' }];

  return (
    <div className='relative h-[500px] w-full max-w-96 rounded-3xl border p-4'>
      <DividerLine className={`${metamorphous.className} text-lg`}>
        Menu
      </DividerLine>
      {/* This div needs to scale to fill container hieght */}
      <div className='flex flex-col gap-4'>
        <ul className='scroll-narrow flex-grow overflow-y-auto'>
          {items.map((item, i) => (
            <li
              key={i}
              onClick={() =>
                router.push(`/Bakery/Create/Menu?itemId=${item.id}`)
              }
            >
              <span className='text-left'>text</span>
              <span className='text-right'>$0.00</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => router.push('/Bakery/Create/Menu?itemId=newItem')}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default CurrentMenu;
