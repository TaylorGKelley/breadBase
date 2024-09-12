import React, { SVGProps } from 'react';

type SelectedCheckProps = SVGProps<SVGElement> & {
  selected: boolean;
  defaultColor?: string;
  selectedColor?: string;
};

function SelectedCheck({
  selected,
  className,
  defaultColor = '#F4F4F4',
  selectedColor = '#EAA827',
}: SelectedCheckProps) {
  return selected ? (
    <svg
      viewBox='0 0 25 25'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
    >
      <path
        d='M24.2188 12.1094C24.2188 18.7972 18.7972 24.2188 12.1094 24.2188C5.42153 24.2188 0 18.7972 0 12.1094C0 5.42153 5.42153 0 12.1094 0C18.7972 
        0 24.2188 5.42153 24.2188 12.1094ZM10.7087 18.5212L19.6931 9.53682C19.9981 9.23174 19.9981 8.73706 19.6931 8.43198L18.5882 7.32715C18.2832 
        7.02202 17.7885 7.02202 17.4833 7.32715L10.1562 14.6542L6.7354 11.2333C6.43032 10.9283 5.93564 10.9283 5.63052 11.2333L4.52568 12.3382C4.22061 
        12.6433 4.22061 13.1379 4.52568 13.443L9.60381 18.5211C9.90894 18.8263 10.4036 18.8263 10.7087 18.5212Z'
        fill={selectedColor}
      />
    </svg>
  ) : (
    <svg
      viewBox='0 0 25 25'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
    >
      <path
        d='M23.4688 12.1094C23.4688 18.383 18.383 23.4688 12.1094 23.4688C5.83575 23.4688 0.75 18.383 0.75 
        12.1094C0.75 5.83575 5.83575 0.75 12.1094 0.75C18.383 0.75 23.4688 5.83575 23.4688 12.1094Z'
        stroke={defaultColor}
        strokeWidth='1.5'
      />
    </svg>
  );
}

export default SelectedCheck;
