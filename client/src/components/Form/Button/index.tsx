import React, {
  ButtonHTMLAttributes,
  HTMLProps,
  PropsWithChildren,
} from 'react';
import { useFormStatus } from 'react-dom';

type FormButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {};

function Button({
  children,
  type = 'submit',
  className,
  ...attributes
}: FormButtonProps) {
  return (
    <button
      type={type}
      className={`flex h-10 w-full items-center justify-center gap-3 text-nowrap rounded-full border bg-transparent px-6 text-sm outline-none transition-colors duration-300 disabled:cursor-text disabled:opacity-90 ${className}`}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default Button;
