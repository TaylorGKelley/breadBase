import React from 'react';
import styles from './BackgroundImageContainer.module.css';
import Image from 'next/image';

type BackgroundImageContainerProps = {
  path: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  tintColor?: string;
  blurFilter?: string;
  children?: React.ReactNode;
};

export default function BackgroundImageContainer({
  path,
  backgroundPosition = 'center center',
  backgroundSize = 'cover',
  tintColor = '',
  blurFilter = '0px',
  children,
}: BackgroundImageContainerProps) {
  return (
    <div
      className={styles.ImageContainer}
      style={
        {
          background: `url('${path}') ${backgroundPosition}`,
          backgroundSize,
          '--tint-color': tintColor,
          '--blur-filter': blurFilter,
        } as React.CSSProperties
      }
    >
      <div>{children}</div>
    </div>
  );
}
