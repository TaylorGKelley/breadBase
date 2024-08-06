import React from 'react';
import { defaultColor } from './Icons';

export default function User({
  width = '2rem',
  fill = defaultColor,
}: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 46 47'
      style={{ width, fill }}
    >
      <path d='M22.6365 0C10.1316 0 0 10.4902 0 23.4375C0 36.3848 10.1316 46.875 22.6365 46.875C35.1413 46.875 45.2729 36.3848 45.2729 23.4375C45.2729 10.4902 35.1413 0 22.6365 0ZM22.6365 9.07258C27.0725 9.07258 30.6688 12.7961 30.6688 17.3891C30.6688 21.9821 27.0725 25.7056 22.6365 25.7056C18.2004 25.7056 14.6042 21.9821 14.6042 17.3891C14.6042 12.7961 18.2004 9.07258 22.6365 9.07258ZM22.6365 41.5827C17.2786 41.5827 12.4774 39.0688 9.26452 35.1374C10.9805 31.7918 14.3395 29.4859 18.2552 29.4859C18.4743 29.4859 18.6933 29.5237 18.9033 29.5898C20.0899 29.9868 21.3312 30.2419 22.6365 30.2419C23.9417 30.2419 25.1922 29.9868 26.3696 29.5898C26.5796 29.5237 26.7986 29.4859 27.0177 29.4859C30.9335 29.4859 34.2924 31.7918 36.0084 35.1374C32.7955 39.0688 27.9944 41.5827 22.6365 41.5827Z' />
    </svg>
  );
}
