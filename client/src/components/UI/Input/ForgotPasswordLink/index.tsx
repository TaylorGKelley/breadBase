import Link from 'next/link';
import React from 'react';

type ForgotPasswordLinkProps = {
  className?: string;
};

function ForgotPasswordLink({ className }: ForgotPasswordLinkProps) {
  return (
    <Link
      href='/ForgotPassword'
      className={`my-2 ml-4 inline-block w-fit text-xs text-gray-300 underline ${className}`}
    >
      Forgot Password
    </Link>
  );
}

export default ForgotPasswordLink;
