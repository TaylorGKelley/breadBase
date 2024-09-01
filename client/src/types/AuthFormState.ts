import User from './User';

type FormErrors = {
  message?: string;
};

type AuthFormState = {
  success: boolean;
  errors?: FormErrors;
  user?: User;
};

export type AuthWithAttempts<T> = T & { attempts: number };

export type SignUpFormState = AuthFormState & {
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

export type LoginFormState = AuthFormState & {
  email: string;
  errors?: FormErrors & {
    email?: string;
    password?: string;
  };
};
