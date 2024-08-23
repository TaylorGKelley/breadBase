import React, {
  ButtonHTMLAttributes,
  HTMLProps,
  PropsWithChildren,
} from 'react';

type FormButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {};

function FormButton({
  children,
  type = 'submit',
  className,
  ...attributes
}: FormButtonProps) {
  return (
    <button
      type={type}
      className={`border-yellow text-yellow focus:bg-yellow hover:bg-yellow block w-96 rounded-full border bg-transparent px-6 py-2 text-sm outline-none transition-colors duration-300 hover:text-white focus:text-white ${className}`}
    >
      {children}
    </button>
  );
}

export default FormButton;
