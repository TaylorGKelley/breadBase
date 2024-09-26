import React from 'react';
import Star from '@/components/icons/Star';

type ImagePreviewProps = {
  imageBase: string;
};

function ImagePreview({ imageBase }: ImagePreviewProps) {
  return (
    <div className='relative flex aspect-square h-[86px] items-center justify-center rounded-xl bg-cover bg-center bg-no-repeat'>
      <img
        src={`data:image/png;base64,${imageBase}`}
        className='h-full w-full object-cover object-center'
      />
    </div>
  );
}

export default ImagePreview;
