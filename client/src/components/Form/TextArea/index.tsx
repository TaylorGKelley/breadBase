import React, { useEffect, useRef, useState } from 'react';
import type { FormEvent, TextareaHTMLAttributes } from 'react';
import InputError from '../InputError';
import { useFormContext } from 'react-hook-form';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  error?: string;
  labelClassName?: string;
  defaultHeightPx?: number;
  bulletPoints?: boolean;
};

function TextArea({
  name,
  label,
  error,
  labelClassName,
  className,
  defaultHeightPx = 150,
  bulletPoints,
  ...attributes
}: TextAreaProps) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [text, setText] = useState<string>(getValues(name));

  const handleInput = (textArea: HTMLTextAreaElement) => {
    setText(textArea.value);
    if (textArea.scrollHeight < defaultHeightPx) {
      textArea.style.height = `${defaultHeightPx}px`;
    } else {
      textArea.style.height = 'auto'; // reset height so that it shrinks properly, otherwise it decrements by 2
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    const textArea = document.getElementById(name) as HTMLTextAreaElement;

    if (!textArea) return;

    handleInput(textArea);
  }, [text]);

  return (
    <div className='relative flex w-auto flex-col overflow-x-hidden overflow-y-visible'>
      <label
        htmlFor={name}
        className={`focus-within:text-yellow my-1 w-full max-w-96 overflow-hidden text-ellipsis text-nowrap ${labelClassName}`}
      >
        {`${attributes.required ? '*' : ''} ${label}`}
      </label>
      <div className='relative w-full'>
        {bulletPoints && (
          <div className='pointer-events-none absolute left-6 top-3.5 flex flex-col justify-start'>
            {text?.split('\n').map((_, index) => (
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
          id={name}
          value={text}
          onInput={(e: FormEvent<HTMLTextAreaElement>) =>
            handleInput(e.currentTarget)
          }
          {...register(name)}
          className={`focus:border-yellow inline-block h-auto w-full resize-none overflow-y-hidden rounded-3xl border border-gray-200 bg-transparent px-6 py-3 text-sm leading-6 outline-none placeholder:opacity-75 ${className} ${bulletPoints ? 'pl-10' : ''}`}
          style={{
            minHeight: `${defaultHeightPx}px`,
          }}
          {...attributes}
        />
      </div>
      <InputError
        error={errors[name as keyof typeof errors]?.message?.toString()}
      />
    </div>
  );
}

export default TextArea;
