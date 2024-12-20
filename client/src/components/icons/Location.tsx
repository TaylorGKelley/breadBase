import React from 'react';
import { defaultColor } from '.';

export default function Location({
  width = '2rem',
  fill = defaultColor,
}: React.SVGProps<SVGElement>) {
  return (
    <svg
      viewBox='0 0 16 21'
      xmlns='http://www.w3.org/2000/svg'
      style={{ width, fill }}
    >
      <path d='M7.06568 20.5763C1.10619 11.9368 0 11.0501 0 7.875C0 3.52574 3.52574 0 7.875 0C12.2243 0 15.75 3.52574 15.75 7.875C15.75 11.0501 14.6438 11.9368 8.68432 20.5763C8.29323 21.1413 7.45672 21.1412 7.06568 20.5763ZM7.875 11.1562C9.68719 11.1562 11.1562 9.68719 11.1562 7.875C11.1562 6.06281 9.68719 4.59375 7.875 4.59375C6.06281 4.59375 4.59375 6.06281 4.59375 7.875C4.59375 9.68719 6.06281 11.1562 7.875 11.1562Z' />
    </svg>
  );
}
