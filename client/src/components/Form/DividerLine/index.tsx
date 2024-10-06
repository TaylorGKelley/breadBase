import React from 'react';

type DividerLineProps = {
  children?: React.ReactNode;
  className?: string;
  lineClassName?: string;
};

function DividerLine({ children, className, lineClassName }: DividerLineProps) {
  return (
    <div className='relative flex items-center'>
      <span
        className={`h-0.5 flex-grow rounded bg-gray-300 ${lineClassName}`}
      ></span>
      <p className={`mx-4 text-gray-300 ${className}`}>{children}</p>
      <span
        className={`h-0.5 flex-grow rounded bg-gray-300 ${lineClassName}`}
      ></span>
    </div>
  );
}

export default DividerLine;
