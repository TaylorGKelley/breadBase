import React, { useState } from 'react';
import type { FormEvent, TextareaHTMLAttributes } from 'react';
import InputError from '../Input/InputError';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  labelClassName?: string;
  defaultHeightPx?: number;
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
  defaultHeightPx = 200,
  ...attributes
}: TextAreaProps) {
  const [showError, setShowError] = useState<boolean>(false);

  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    if (!showError) {
      setShowError(false);
    }

    if (
      e.currentTarget.scrollHeight < defaultHeightPx ||
      e.currentTarget.value === ''
    ) {
      e.currentTarget.style.height = `${defaultHeightPx}px`;
    } else {
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    }
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
        className={`focus:border-yellow inline-block h-[${defaultHeightPx}px] w-full resize-none overflow-y-hidden rounded-3xl border border-gray-200 bg-transparent px-6 py-3 text-sm outline-none placeholder:opacity-75 ${className}`}
        required={required}
        {...attributes}
      />
      {error && <InputError error={error} />}
    </div>
  );
}

export default TextArea;
