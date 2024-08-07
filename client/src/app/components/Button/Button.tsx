'use client';

import React from 'react';
import styles from './Button.module.css';
import useSelectedBakery from '@/app/store/selectedBakery';

export default function Button({
  OnClick,
  Type = 1,
  children,
}: {
  OnClick?: () => void;
  Type?: number;
  children: React.ReactNode;
}) {
  const selectedBakery = useSelectedBakery();

  const handleClick = () => {
    if (Type === 2) {
      selectedBakery.clearSelectedBakery();
      return;
    }

    selectedBakery.setSelectedBakery(2, 'Royal Rolls Bakery');
  };

  return <button onClick={OnClick ?? handleClick}>{children}</button>;
}
