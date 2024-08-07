import React from 'react';
import styles from './BackgroundImageContainer.module.css';
import Image from 'next/image';

type BackgroundImageContainerProps = {
  path: string;
  tintColor?: string;
  blurFilter?: string;
  children?: React.ReactNode;
};

export default function BackgroundImageContainer({
  path,
  tintColor = '',
  blurFilter = '0px',
  children,
}: BackgroundImageContainerProps) {
  return (
    <div className={styles.ImageContainer}>
      <Image
        src={path}
        fill={true}
        alt={'Hero Background Image'}
      />
      {children}
    </div>
  );
}
