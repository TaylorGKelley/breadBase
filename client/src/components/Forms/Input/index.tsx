'use client';

import HidePasswordIcon from '@/components/icons/HidePasswordIcon';
import ShowPasswordIcon from '@/components/icons/ShowPasswordIcon';
import React, { FormEvent, InputHTMLAttributes, useState } from 'react';
import ForgotPasswordLink from './ForgotPasswordLink';
import { useFormStatus } from 'react-dom';
import InputError from './InputError';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
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
  required,
  error,
  labelClassName,
  className,
  linkClassName,
  displayForgotPassword = false,
  ...attributes
}: InputProps) {
  const isPasswordInput = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showError, setShowError] = useState<boolean>(true);
  const { pending } = useFormStatus();

  const togglePasswordVisibility = () => {
    if (isPasswordInput) setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setShowError(false);
  };

  const handleUnFocus = (e: FormEvent<HTMLInputElement>) => {
    setShowError(true);
  };

  return (
    <div className='flex w-auto flex-col overflow-x-hidden overflow-y-visible'>
      <label
        htmlFor={id}
        className={`focus-within:text-yellow my-1 w-full max-w-96 overflow-hidden text-ellipsis text-nowrap ${labelClassName}`}
      >
        {`${required ? '*' : ''} ${label}`}
      </label>
      {showError && error && (
        <span className='inline text-nowrap text-xs text-red-400'>{`  ${error}`}</span>
      )}
      <div className='relative'>
        <input
          type={
            !isPasswordInput ? type : isPasswordVisible ? 'text' : 'password'
          }
          onChange={handleInputChange}
          onBlur={handleUnFocus}
          id={id}
          name={name ? name : id} // If name isn't specified, use the id
          placeholder={placeholder}
          className={`focus:border-yellow inline-block w-full rounded-full border border-gray-200 bg-transparent px-6 py-2 text-sm outline-none placeholder:opacity-75 ${className}`}
          required={required}
          {...attributes}
        />
        {!error ? (
          isPasswordInput && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-0 top-1/2 flex h-full w-12 -translate-y-1/2 items-center justify-center rounded-full pr-2 outline-none transition-all focus:brightness-75'
            >
              {!isPasswordVisible ? <ShowPasswordIcon /> : <HidePasswordIcon />}
            </button>
          )
        ) : (
          <InputError error={error} />
        )}
      </div>
      {isPasswordInput && displayForgotPassword && <ForgotPasswordLink />}
    </div>
  );
}

export default Input;
