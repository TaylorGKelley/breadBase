'use client';
import useAuthStore from '@/store/useAuthStore';
import User from '@/types/User';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

type CheckBakerStatusProps = PropsWithChildren & {
  redirectTo: string;
  condition: (user: User | null | undefined) => boolean;
};

function CheckBakerStatus({
  children,
  redirectTo,
  condition,
}: CheckBakerStatusProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  if (condition(user)) {
    router.push(redirectTo);
  }

  return <>{children}</>;
}

export default CheckBakerStatus;
