'use client';

import useAuthStore from '@/store/useAuthStore';
import User from '@/types/User';
import { usePathname, useRouter } from 'next/navigation';
import React, { FormHTMLAttributes, SetStateAction, useEffect } from 'react';
import { useFormState } from 'react-dom';

type AuthFormProps<T> = FormHTMLAttributes<HTMLFormElement> & {
  action: (formData: FormData) => Promise<T>;
  preferRedirect?: string;
  setFormState: (arg: SetStateAction<T>) => void;
};

type GenericFormState<T> = T & {
  success: boolean;
  user?: User;
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
      const formState = (await action(formData)) as GenericFormState<T>;

      if ((formState as any).success) {
        if ((formState as any)?.user) loginUser((formState as any).user);
      }

      setFormState({ ...formState });

      return formState;
    },
    {} as Awaited<T>,
  );

  useEffect(() => {
    if ((formState as GenericFormState<T>).success === true) {
      if (
        noRedirectRoutes.includes(previousPathname) ||
        noRedirectRoutes.includes(preferRedirect || '') ||
        preferRedirect === pathname
      ) {
        router.push('/');
      } else {
        router.push(preferRedirect || previousPathname);
      }
    }
  }, [formState]);

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
