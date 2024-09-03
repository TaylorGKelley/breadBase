'use client';

import useAuthStore from '@/store/useAuthStore';
import { AuthWithAttempts } from '@/types/AuthFormState';
import { usePathname, useRouter } from 'next/navigation';
import React, { FormHTMLAttributes, SetStateAction } from 'react';
import { useFormState } from 'react-dom';

type AuthFormProps<T> = FormHTMLAttributes<HTMLFormElement> & {
  action: (formData: FormData) => Promise<T>;
  preferRedirect?: string;
  setFormState: (arg: SetStateAction<T>) => void;
};

const noRedirectRoutes = ['/SignUp', '/Login'];

function AuthForm<T>({
  children,
  action,
  preferRedirect,
  setFormState,
  ...attributes
}: AuthFormProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const { loginUser, previousPathname } = useAuthStore();

  const [formState, dispatch] = useFormState<T, FormData>(
    async (previousState: T, formData: FormData) => {
      const formState = (await action(formData)) as T;
      if ((formState as any).success) {
        if ((formState as any)?.user) loginUser((formState as any).user);
        if (
          noRedirectRoutes.includes(previousPathname) ||
          previousPathname === pathname
        )
          router.push('/');
        else router.push(preferRedirect || previousPathname);
      }

      setFormState({ ...formState });

      return formState;
    },
    {} as Awaited<T>,
  );

  return (
    <form
      action={dispatch}
      {...attributes}
    >
      {children}
    </form>
  );
}

export default AuthForm;
