'use client';

import React, { MouseEvent } from 'react';
import DraggableScrollContainer from '@/components/DraggableScrollContainer';

type ImageInputProps = {
  label: string;
};

function ImageInput({ label }: ImageInputProps) {
  return (
    <div className='my-4 [&>div]:border [&>div]:border-white [&>div]:px-4 [&>div]:py-3'>
      <label>{label}</label>
      <DraggableScrollContainer>
        <div
          className='flex aspect-square h-[86px] items-center justify-center rounded-xl border border-white hover:cursor-pointer'
          // On drag over
          // on drop
        >
          {/* Plus icon */}
        </div>
        <div
          className='flex aspect-square h-[86px] items-center justify-center rounded-xl bg-[url("/images/Bread.png")] bg-cover bg-center bg-no-repeat hover:cursor-pointer'
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            console.log('clicked me 1');
          }}
        ></div>
        <div
          className='flex aspect-square h-[86px] items-center justify-center rounded-xl bg-[url("/images/Bread.png")] bg-cover bg-center bg-no-repeat hover:cursor-pointer'
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            console.log('clicked me 1');
          }}
        ></div>
        <div className='flex aspect-square h-[86px] items-center justify-center rounded-xl bg-[url("/images/Bread.png")] bg-cover bg-center bg-no-repeat hover:cursor-pointer'></div>
        <div className='flex aspect-square h-[86px] items-center justify-center rounded-xl bg-[url("/images/Bread.png")] bg-cover bg-center bg-no-repeat hover:cursor-pointer'></div>
        <div className='flex aspect-square h-[86px] items-center justify-center rounded-xl bg-[url("/images/Bread.png")] bg-cover bg-center bg-no-repeat hover:cursor-pointer'></div>
      </DraggableScrollContainer>
    </div>
  );
}

export default ImageInput;
