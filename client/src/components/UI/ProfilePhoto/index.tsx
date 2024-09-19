import Image from 'next/image';
import React from 'react';

type ProfilePhotoProps = {
  photoBase: string;
  width?: number;
};

function ProfilePhoto({ photoBase, width }: ProfilePhotoProps) {
  return (
    <Image
      src={`data:image/*;base64,${photoBase}`}
      alt='Profile Photo'
      width={width}
      height={width}
      className='aspect-square rounded-full object-center'
    />
  );
}

export default ProfilePhoto;
