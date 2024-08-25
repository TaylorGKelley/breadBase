import React, { CSSProperties } from 'react';
import Image from 'next/image';

type BackgroundImageContainerProps = {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
};

export default function BackgroundImageContainer({
  src,
  alt,
  className,
  children,
}: BackgroundImageContainerProps) {
  return (
    <div
      className={`relative h-full w-full flex-grow before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:content-[''] ${className}`}
    >
      <Image
        alt={alt}
        src={src}
        fill
        sizes='100vw'
        className='object-cover'
      />
      <div className='absolute z-20 h-full w-full'>{children}</div>
    </div>
  );
}
