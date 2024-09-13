'use client';

import useAuthStore from '@/store/useAuthStore';
import { usePathname } from 'next/navigation';
import React, { FormHTMLAttributes, SetStateAction } from 'react';
import { useFormState } from 'react-dom';

type AuthFormProps<T> = FormHTMLAttributes<HTMLFormElement> & {
  action: (formData: FormData, redirectTo: string) => Promise<T>;
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
  const pathname = usePathname();
  const { loginUser, previousPathname } = useAuthStore();

  const [formState, dispatch] = useFormState<T, FormData>(
    async (previousState: T, formData: FormData) => {
      let redirectTo = '/';
      if (
        noRedirectRoutes.includes(previousPathname) ||
        noRedirectRoutes.includes(preferRedirect || '') ||
        preferRedirect === pathname
      ) {
        redirectTo = '/';
      } else {
        redirectTo = preferRedirect || previousPathname;
      }

      const formState = (await action(formData, redirectTo)) as T;

      if ((formState as any).success) {
        if ((formState as any)?.user) loginUser((formState as any).user);
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
