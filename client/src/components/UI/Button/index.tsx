'use client';

import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;
  OnClick?: () => void;
};

export default function Button({
  secondary = false,
  OnClick,
  className,
  children,
  ...attributes
}: ButtonProps) {
  return (
    <button
      onClick={OnClick}
      className={`${secondary ? 'text-yellow bg-transparent' : 'bg-yellow text-black'} border-yellow inline-block rounded-full border-2 p-2 ${className}`}
      {...attributes}
    >
      {children}
    </button>
  );
}
