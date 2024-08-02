import React from 'react';

export default function Cart({
  width = 46,
  height = 47,
  fill = '#f3f3f3',
}: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
    >
      <path
        d='M42.8486 25.3124L46.6841 7.8393C46.961 6.5777 46.0348 5.37634 44.7853 5.37634H12.9172L12.1735 1.61206C11.9882 0.673807 11.1908 0 10.2658 0H1.94722C0.871788 0 0 0.902638 0 2.01613V3.36022C0 4.47371 0.871788 5.37634 1.94722 5.37634H7.61713L13.3166 34.2267C11.9531 35.0386 11.0343 36.561 11.0343 38.3065C11.0343 40.9046 13.0685 43.0108 15.5778 43.0108C18.0871 43.0108 20.1213 40.9046 20.1213 38.3065C20.1213 36.9898 19.5982 35.8002 18.7563 34.9462H35.7658C34.924 35.8002 34.4009 36.9898 34.4009 38.3065C34.4009 40.9046 36.4351 43.0108 38.9444 43.0108C41.4538 43.0108 43.488 40.9046 43.488 38.3065C43.488 36.4439 42.4423 34.8343 40.9258 34.0722L41.3734 32.0328C41.6504 30.7713 40.7242 29.5699 39.4747 29.5699H17.6968L17.1657 26.8817H40.9498C41.859 26.8817 42.6472 26.2303 42.8486 25.3124Z'
        fill={fill}
      />
    </svg>
  );
}
