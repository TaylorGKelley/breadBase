'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function CurrentMenu() {
  const router = useRouter();

  const items = [{ id: 'blah' }];

  return (
    <div>
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            onClick={() => router.push(`/Bakery/Create/Menu?itemId=${item.id}`)}
          >
            <span className='text-left'>text</span>
            <span className='text-right'>$0.00</span>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/Bakery/Create/Menu?itemId=newItem')}>
        Add Item
      </button>
    </div>
  );
}

export default CurrentMenu;
