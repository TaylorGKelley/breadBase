import React, { SVGProps } from 'react';
import { defaultColor } from '.';

function Close({
  className,
  fill = defaultColor,
  strokeWidth = 2.25,
  strokeLinecap = 'round',
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M2 2L12 12M2 12L12 2'
        stroke={fill}
        stroke-width={strokeWidth}
        stroke-linecap={strokeLinecap}
      />
    </svg>
  );
}

export default Close;
