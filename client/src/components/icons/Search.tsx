import React, { SVGProps } from 'react';
import { defaultColor } from '.';

function Search({ className, fill = defaultColor }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.7778 15.4353C11.4946 16.2388 9.97735 16.7033 8.35165 16.7033C3.73916 16.7033 0 12.9641 0 8.35165C0 3.73916 3.73916 0 8.35165 0C12.9641 0 16.7033 3.73916 16.7033 8.35165C16.7033 9.97735 16.2388 11.4946 15.4353 12.7778L18.4496 15.7921C19.1835 16.526 19.1835 17.7158 18.4496 18.4496C17.7158 19.1835 16.526 19.1835 15.7921 18.4496L12.7778 15.4353ZM13.3626 8.35165C13.3626 11.1191 11.1191 13.3626 8.35165 13.3626C5.58416 13.3626 3.34066 11.1191 3.34066 8.35165C3.34066 5.58416 5.58416 3.34066 8.35165 3.34066C11.1191 3.34066 13.3626 5.58416 13.3626 8.35165Z'
        fill={fill}
      />
    </svg>
  );
}

export default Search;
