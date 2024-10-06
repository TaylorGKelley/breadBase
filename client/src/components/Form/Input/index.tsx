import React, { InputHTMLAttributes, ReactNode } from 'react';
import InputError from '../InputError';
import { useFormContext } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  labelClassName?: string;
  ActionButton?: ReactNode;
};

function Input({
  type = 'text',
  name,
  label,
  labelClassName,
  className,
  children,
  ActionButton,
  ...attributes
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='flex w-auto flex-col'>
      <label
        htmlFor={name}
        className={`focus-within:text-yellow my-1 w-full max-w-96 overflow-hidden text-ellipsis text-nowrap ${labelClassName}`}
      >
        {`${attributes?.required ? '* ' : ''}${label}`}
      </label>
      <div className='relative'>
        <input
          type={type}
          id={name}
          className={`focus:border-yellow inline-block w-full rounded-full border border-gray-200 bg-transparent px-6 py-2 text-sm outline-none placeholder:opacity-75 ${className}`}
          {...register(name)}
          {...attributes}
        />
        <InputError
          error={errors[name as keyof typeof errors]?.message?.toString()}
        />
        {ActionButton}
      </div>
      {children}
    </div>
  );
}

export default Input;
