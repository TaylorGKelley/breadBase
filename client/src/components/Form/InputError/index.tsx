import React from 'react';

type InputErrorProps = {
  error: string | undefined;
};

function InputError({ error }: InputErrorProps) {
  if (!error) return null;

  return (
    <div className='absolute right-[0.75rem] top-1/2 flex aspect-square h-1/2 -translate-y-1/2 cursor-text items-center justify-center rounded-full bg-red-500 p-1 opacity-80 outline-none transition-opacity hover:opacity-100'>
      <p>{'!'}</p>
    </div>
  );
}

export default InputError;
