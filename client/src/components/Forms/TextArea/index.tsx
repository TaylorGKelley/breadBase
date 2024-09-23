import React, { useState } from 'react';
import type { FormEvent, TextareaHTMLAttributes } from 'react';
import InputError from '../Input/InputError';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  labelClassName?: string;
};

function TextArea({
  id,
  label,
  name,
  placeholder,
  required,
  error,
  labelClassName,
  className,
  ...attributes
}: TextAreaProps) {
  const [showError, setShowError] = useState<boolean>(false);

  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setShowError(false);
  };

  const handleUnFocus = (e: FormEvent<HTMLTextAreaElement>) => {
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
      <textarea
        onChange={handleInputChange}
        onBlur={handleUnFocus}
        id={id}
        name={name ? name : id}
        placeholder={placeholder}
        className={`rounded-3xl border border-white ${className}`}
        required={required}
        {...attributes}
      />
      {error && <InputError error={error} />}
    </div>
  );
}

export default TextArea;
