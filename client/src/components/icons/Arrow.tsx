import React, { SVGProps } from 'react';
import { defaultColor } from '.';

type ArrowProps = SVGProps<SVGElement> & {
  left?: boolean;
};

function Arrow({
  left = false,
  className,
  fill = defaultColor,
  strokeWidth = 2,
}: ArrowProps) {
  return (
    <svg
      width='22'
      height='17'
      viewBox='0 0 22 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${left && 'rotate-180'} ${className}`}
    >
      <path
        d='M1.07275 8.34198H20.9273M20.9273 8.34198L14.0233 15.6513M20.9273 8.34198L14.0233 1.13965'
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default Arrow;
