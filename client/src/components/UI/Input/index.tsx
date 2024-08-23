'use client';

import HidePasswordIcon from '@/components/icons/HidePasswordIcon';
import ShowPasswordIcon from '@/components/icons/ShowPasswordIcon';
import React, { useState } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  label: string;
  additionalClass?: string;
};

function Input({
  type,
  id,
  label,
  name,
  placeholder,
  additionalClass,
  ...attributes
}: InputProps) {
  const isPasswordInput = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    if (isPasswordInput) setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='flex flex-col overflow-x-hidden'>
      <label
        htmlFor={id}
        className='text-nowrap text-ellipsis overflow-hidden'
      >
        {label}
      </label>
      <input
        type={!isPasswordInput ? type : isPasswordVisible ? 'text' : 'password'}
        id={id}
        name={name ? name : id} // If name isn't specified, use the id
        placeholder={placeholder}
        className={`${additionalClass} block w-96 rounded-full px-6 py-2 text-sm bg-transparent border border-gray-200`}
        {...attributes}
      />
      {isPasswordInput ? (
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='p-2 hover:backdrop-brightness-95 transition-all'
        >
          {!isPasswordVisible ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
      ) : null}
    </div>
  );
}

export default Input;
