import React, { InputHTMLAttributes } from 'react';
import { Close, Search } from '../icons';

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {};

function SearchBar({ placeholder, ...attributes }: SearchBarProps) {
  return (
    <search className='relative'>
      <button className='absolute left-1 top-1/2 aspect-square h-[85%] -translate-y-1/2 rounded-full p-2.5'>
        <Search className='h-full' />
      </button>
      <input
        type='text'
        placeholder={placeholder}
        className='h-full w-full rounded-full border-[1px] border-white bg-transparent px-10 py-2 text-white outline-none'
        {...attributes}
      />
      <button className='absolute right-1 top-1/2 aspect-square h-[85%] -translate-y-1/2 rounded-full p-3'>
        <Close className='h-auto' />
      </button>
    </search>
  );
}

export default SearchBar;
