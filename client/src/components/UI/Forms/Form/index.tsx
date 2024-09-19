import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';

type FormProps<T> = PropsWithChildren & {
  action: (formData: FormData) => Promise<T>;
  setFormState: Dispatch<SetStateAction<T>>;
  onSuccess?: (formState: T) => void;
};

function Form<T>({ action, children }: FormProps<T>) {
  return <form action={action}>{children}</form>;
}

export default Form;
