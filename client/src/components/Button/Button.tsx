'use client';

import React from 'react';

type ButtonProps = {
  secondary?: boolean;
  OnClick?: () => void;
  children: React.ReactNode;
};

export default function Button({
  secondary = false,
  OnClick,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={OnClick}
      className='border-yellow text-yellow inline-block rounded-full p-8'
    >
      {children}
    </button>
  );
}
