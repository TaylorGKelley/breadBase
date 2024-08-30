import User from './User';

type FormErrors = {
  message?: string;
};

type FormState = {
  success: boolean;
  errors?: FormErrors;
  user?: User;
};

export type SignUpFormState = FormState & {
  firstName: string;
  lastName: string;
  email: string;
  errors?: FormErrors & {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };
};

export type LoginFormState = FormState & {
  email: string;
  errors?: FormErrors & {
    email?: string;
    password?: string;
  };
};
