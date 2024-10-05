import React from 'react';

type InputErrorProps = {
  error: string | undefined;
};

function InputError({ error }: InputErrorProps) {
  if (!error) return null;

  return <p className='ml-4 py-1 text-sm text-red-400'>{error}</p>;
}

export default InputError;
