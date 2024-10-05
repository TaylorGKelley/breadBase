'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, InputHTMLAttributes } from 'react';
import getBase64 from '@/utils/getBase64';
import { Upload } from '@/components/icons';
import { useFormContext } from 'react-hook-form';
import convertToFileList from '@/utils/convertToFileList';

type ImageInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

type UploadedImage = {
  name: string;
  base: string;
};

function ImageInput({
  name,
  label,
  className,
  required = false,
  ...attributes
}: ImageInputProps) {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const uploadLabel = useRef<HTMLLabelElement | null>(null);
  const [image, setImage] = useState<UploadedImage>();

  useEffect(() => {
    const image = getValues(name);
    if (image) {
      setImage(() => ({
        name: image.name,
        base: image.base,
      }));
    }
  }, [getValues, name]);

  const dragOverStyle = 'bg-white/50' as const;

  const processFile = (fileList: FileList) => {
    const file = Array.from(fileList)[0];
    getBase64(file)
      .then((base64) => {
        setImage(() => ({
          name: file.name,
          base: base64 as string,
        }));
        setValue(
          name,
          { name: file.name, base: base64 as string },
          { shouldDirty: true },
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className=''>
      <p className='my-1 w-full max-w-96 overflow-hidden text-ellipsis text-nowrap'>
        {`${required ? '* ' : ''}${label}`}
      </p>
      {/*  bg-[url('src:image/*;base,${image.base}')]/40 */}
      <div className='relative overflow-hidden rounded-3xl border'>
        {image?.base && (
          <img
            src={`data:image/png;base64,${image.base}`}
            className='absolute -z-10 h-full w-full object-cover object-center opacity-40'
          />
        )}
        <label
          ref={uploadLabel}
          htmlFor={name}
          className={`flex h-full w-full flex-col gap-2 bg-gray-900/30 px-4 py-6 text-center ${className}`}
        >
          <div className='flex justify-center pb-3'>
            <Upload
              fill='white'
              className='w-10'
            />
          </div>
          <p>{!!image ? 'Edit image' : 'Upload image'}</p>
          <p
            className={`${!image && 'font-extralight italic'} mx-auto max-w-52 overflow-hidden text-ellipsis text-nowrap text-center`}
          >
            {!!image ? image.name : 'choose a file'}
          </p>
        </label>
        <input
          type='file'
          id={name}
          className='absolute inset-0 z-10 cursor-pointer opacity-0 file:cursor-pointer'
          multiple
          onDragOver={(e: DragEvent<HTMLDivElement>) => {
            if (uploadLabel.current)
              uploadLabel.current.classList.add(dragOverStyle);
          }}
          onDrop={(e: DragEvent<HTMLInputElement>) => {
            processFile(e.dataTransfer.files);
            if (uploadLabel.current)
              uploadLabel.current.classList.remove(dragOverStyle);
          }}
          onDragLeave={(e: DragEvent<HTMLInputElement>) => {
            if (uploadLabel.current)
              uploadLabel.current.classList.remove(dragOverStyle);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) processFile(e.target.files);
          }}
          {...attributes}
        />
      </div>
    </div>
  );
}

export default ImageInput;
