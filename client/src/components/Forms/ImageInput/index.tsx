'use client';

import React, { DragEvent, useState } from 'react';
import DraggableScrollContainer from '@/components/DraggableScrollContainer';
import ImagePreview from './ImagePreview';
import getBase64 from '@/utils/getBase64';

type ImageInputProps = {
  label: string;
};

type UploadedImage = {
  image: string;
  isFavorite: boolean;
};

function ImageInput({ label }: ImageInputProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleFavoriteImage = (index: number) => {
    const currentFavoriteIndex = images
      .map((image) => image.isFavorite)
      .indexOf(true);

    setImages((prev) => {
      const currState = [...prev];
      if (currentFavoriteIndex !== -1) {
        currState[currentFavoriteIndex].isFavorite = false;
      }
      currState[index].isFavorite = true;

      return currState;
    });
  };

  const handleDeleteImage = (index: number) => {
    // TODO: Add delete functionality
  };

  return (
    <div className='[&>div]:border [&>div]:border-white [&>div]:px-4 [&>div]:py-3'>
      <label>{label}</label>
      <DraggableScrollContainer>
        <div className='flex aspect-square h-[86px] items-center justify-center rounded-xl border border-white'>
          {/* Plus icon */}
          <input
            type='file'
            name='imageUpload'
            id='imageUpload'
            className='h-full w-full cursor-pointer file:hidden'
            multiple
            onDragOver={(e: DragEvent<HTMLDivElement>) =>
              (e.currentTarget.style.backgroundColor = 'white')
            }
            onDrop={(e: DragEvent<HTMLInputElement>) => {
              const files = Array.from(e.dataTransfer.files);
              files.forEach((file) => {
                getBase64(file)
                  .then((base64) => {
                    setImages((prev) => {
                      let firstImage;
                      if (prev.length === 0) firstImage = true;
                      return [
                        ...prev,
                        {
                          image: base64 as string,
                          isFavorite: firstImage || false,
                        },
                      ];
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              });
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onDragLeave={(e: DragEvent<HTMLDivElement>) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          />
        </div>
        {images.reverse().map((uploadedImage, i) => (
          <ImagePreview
            key={i}
            imageBase={uploadedImage.image}
            isFavorite={uploadedImage.isFavorite}
            favoriteImage={() => handleFavoriteImage(i)}
            deleteImage={() => handleDeleteImage}
          />
        ))}
      </DraggableScrollContainer>
    </div>
  );
}

export default ImageInput;
