import React, { useState } from 'react';
import type { FormEvent, TextareaHTMLAttributes } from 'react';
import InputError from '../Input/InputError';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  labelClassName?: string;
  defaultHeightPx?: number;
  bulletPoints?: boolean;
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
  bulletPoints,
  ...attributes
}: TextAreaProps) {
  const [text, setText] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const handleInputChange = (e: FormEvent<HTMLTextAreaElement>) => {
    if (!showError) {
      setShowError(false);
    }

    if (
      e.currentTarget.scrollHeight < defaultHeightPx ||
      e.currentTarget.value === ''
    ) {
      e.currentTarget.style.minHeight = `${defaultHeightPx}px`;
    } else {
      e.currentTarget.style.height = 'auto'; // reset height so that it shrinks properly, otherwise it decrements by 2
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    }
  };

  const handleUnFocus = (e: FormEvent<HTMLTextAreaElement>) => {
    setShowError(true);
  };

  return (
    <div className='relative flex w-auto flex-col overflow-x-hidden overflow-y-visible'>
      <label
        htmlFor={id}
        className={`focus-within:text-yellow my-1 w-full max-w-96 overflow-hidden text-ellipsis text-nowrap ${labelClassName}`}
      >
        {`${required ? '*' : ''} ${label}`}
      </label>
      <div className='relative w-full'>
        {bulletPoints && (
          <div className='pointer-events-none absolute left-6 top-3.5 flex flex-col justify-start'>
            {text.split('\n').map((_, index) => (
              <div
                key={index}
                className='select-none leading-6'
              >
                •
              </div>
            ))}
          </div>
        )}
        <textarea
          onInput={handleInputChange}
          onChange={(e: FormEvent<HTMLTextAreaElement>) => {
            setText(e.currentTarget.value);
          }}
          value={text}
          onBlur={handleUnFocus}
          id={id}
          name={name ? name : id}
          placeholder={placeholder}
          className={`focus:border-yellow inline-block leading-6 min-h-[${defaultHeightPx}px] h-auto w-full resize-none overflow-y-hidden rounded-3xl border border-gray-200 bg-transparent px-6 py-3 text-sm outline-none placeholder:opacity-75 ${className} ${bulletPoints ? 'pl-10' : ''}`}
          required={required}
          {...attributes}
        />
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}

export default TextArea;
