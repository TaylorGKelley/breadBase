import React, { InputHTMLAttributes } from 'react';
import { Close, Search } from '../icons';

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {};

function SearchBar({ placeholder, ...attributes }: SearchBarProps) {
  return (
    <search className='relative'>
      <button className='absolute left-0 top-1/2 aspect-square h-full -translate-y-1/2'>
        <Search className='h-3' />
      </button>
      <input
        type='search'
        placeholder={placeholder}
        className='h-full w-full rounded-full border-2 border-white bg-transparent px-6 py-3 text-white outline-none'
        {...attributes}
      />
      <button className='absolute right-0 top-1/2 aspect-square h-full -translate-y-1/2'>
        <Close className='h-3' />
      </button>
    </search>
  );
}

export default SearchBar;
