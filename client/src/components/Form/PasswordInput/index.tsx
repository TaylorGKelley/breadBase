import { HidePasswordIcon, ShowPasswordIcon } from '@/components/icons';
import React, { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../Input';

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

function PasswordInput({ label, name, children }: PasswordInputProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Input
      label={label}
      name={name}
      type={isPasswordVisible ? 'text' : 'password'}
      ActionButton={
        errors[name as keyof typeof errors]?.message && (
          <button
            type='button'
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className='absolute right-0 top-1/2 flex h-full w-12 -translate-y-1/2 items-center justify-center rounded-full pr-2 outline-none transition-all focus:brightness-75'
          >
            {!isPasswordVisible ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </button>
        )
      }
    >
      {children}
    </Input>
  );
}

export default PasswordInput;
