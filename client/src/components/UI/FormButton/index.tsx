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
      className={`flex h-10 w-96 items-center justify-center gap-3 text-nowrap rounded-full border bg-transparent px-6 text-sm outline-none transition-colors duration-300 ${className}`}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default FormButton;
