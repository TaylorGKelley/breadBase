'use client';

import HidePasswordIcon from '@/components/icons/HidePasswordIcon';
import ShowPasswordIcon from '@/components/icons/ShowPasswordIcon';
import React, { InputHTMLAttributes, useState } from 'react';
import ForgotPasswordLink from './ForgotPasswordLink';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelClassName?: string;
  linkClassName?: string;
  displayForgotPassword?: boolean;
};

function Input({
  type,
  id,
  label,
  name,
  placeholder,
  labelClassName,
  className,
  linkClassName,
  displayForgotPassword = false,
  ...attributes
}: InputProps) {
  const isPasswordInput = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    if (isPasswordInput) setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='flex w-fit flex-col overflow-x-hidden overflow-y-visible'>
      <label
        htmlFor={id}
        className={`focus-within:text-yellow my-1 w-96 overflow-hidden text-ellipsis text-nowrap ${labelClassName}`}
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type={
            !isPasswordInput ? type : isPasswordVisible ? 'text' : 'password'
          }
          id={id}
          name={name ? name : id} // If name isn't specified, use the id
          placeholder={placeholder}
          className={`focus:border-yellow block w-96 rounded-full border border-gray-200 bg-transparent px-6 py-2 text-sm outline-none placeholder:opacity-75 ${className}`}
          {...attributes}
        />
        {isPasswordInput ? (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-0 top-1/2 flex h-full w-10 -translate-y-1/2 items-center justify-center rounded-full outline-none transition-all focus:brightness-75'
          >
            {!isPasswordVisible ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </button>
        ) : null}
      </div>
      {isPasswordInput && displayForgotPassword ? <ForgotPasswordLink /> : null}
    </div>
  );
}

export default Input;
