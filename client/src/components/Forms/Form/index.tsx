'use client';

import useAuthStore from '@/store/useAuthStore';
import User from '@/types/User';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import type { Dispatch, FormHTMLAttributes, SetStateAction } from 'react';
import { useFormState } from 'react-dom';

type FormProps<T> = FormHTMLAttributes<HTMLFormElement> & {
  action: (formData: FormData) => Promise<T>;
  preferRedirect?: string;
  setFormState: Dispatch<SetStateAction<T>>;
  onSuccess?: (formState: T) => void;
};

type GenericFormState<T> = T & {
  success: boolean;
  user?: User;
};

const noRedirectRoutes = ['/SignUp', '/Login'];

function Form<T>({
  children,
  action,
  preferRedirect,
  setFormState,
  onSuccess,
  ...attributes
}: FormProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const { previousPathname } = useAuthStore();

  const [formState, dispatch] = useFormState<GenericFormState<T>, FormData>(
    async (previousState: T, formData: FormData) => {
      const formState = await action(formData);

      return formState as GenericFormState<T>;
    },
    {} as Awaited<GenericFormState<T>>,
  );

  useEffect(() => {
    if (formState.success && onSuccess) onSuccess(formState);

    setFormState({ ...formState });

    if ((formState as GenericFormState<T>).success) {
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

export default Form;
