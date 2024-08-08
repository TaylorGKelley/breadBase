'use client';

import React from 'react';
import styles from './Button.module.css';
import useSelectedBakery from '@/app/store/selectedBakery';
import { useRouter } from 'next/navigation';

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
  return <button onClick={OnClick}>{children}</button>;
}
