import React, { FormHTMLAttributes } from 'react';
import { FormProvider, FieldValues, UseFormReturn } from 'react-hook-form';

type FormProps = React.PropsWithChildren<
  FormHTMLAttributes<HTMLFormElement>
> & {
  onSubmit: (data: FieldValues) => void;
  methods: UseFormReturn<any, any, undefined>;
};

function Form({
  onSubmit: handleOnSubmit,
  methods,
  children,
  ...attributes
}: FormProps) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleOnSubmit)}
        {...attributes}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
