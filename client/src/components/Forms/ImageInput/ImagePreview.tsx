import Star from '@/components/icons/Star';
import Image from 'next/image';
import React from 'react';

type ImagePreviewProps = {
  imageBase: string;
  isFavorite: boolean;
  favoriteImage: () => void;
  deleteImage?: () => void;
};

function ImagePreview({
  imageBase,
  isFavorite,
  favoriteImage,
  deleteImage,
}: ImagePreviewProps) {
  return (
    <div className='relative flex aspect-square h-[86px] items-center justify-center rounded-xl bg-cover bg-center bg-no-repeat'>
      <img
        src={`data:image/png;base64,${imageBase}`}
        className='h-full w-full object-cover object-center'
      />
      <span
        onClick={() => favoriteImage()}
        className='absolute bottom-0 right-0 cursor-pointer'
      >
        <Star
          color={isFavorite ? '#EAA827' : '#F4F4F4'}
          varient={isFavorite ? 'full' : 'outline'}
        />
      </span>
    </div>
  );
}

export default ImagePreview;
