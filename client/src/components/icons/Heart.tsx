import React, { SVGProps } from 'react';
import { defaultColor } from '.';

function Heart({ fill = defaultColor, width = '2rem' }: SVGProps<SVGElement>) {
  return (
    <svg
      viewBox='0 0 21 18'
      xmlns='http://www.w3.org/2000/svg'
      style={{ fill, width }}
    >
      <path d='M1.95234 10.6166L9.36387 17.5519C9.67148 17.8397 10.0775 18 10.5 18C10.9225 18 11.3285 17.8397 11.6361 17.5519L19.0477 10.6166C20.2945 9.45322 21 7.82115 21 6.11508V5.87665C21 3.00305 18.9287 0.552893 16.1027 0.0801278C14.2324 -0.232309 12.3293 0.380231 10.9922 1.72042L10.5 2.21374L10.0078 1.72042C8.6707 0.380231 6.76758 -0.232309 4.89727 0.0801278C2.07129 0.552893 0 3.00305 0 5.87665V6.11508C0 7.82115 0.705469 9.45322 1.95234 10.6166Z' />
    </svg>
  );
}

export default Heart;
