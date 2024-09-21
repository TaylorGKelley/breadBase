import User from './User';

type AuthFormErrors = {
  message?: string;
};

type AuthFormState = {
  success: boolean;
  errors?: AuthFormErrors;
  user?: User;
};

export type AuthWithAttempts<T> = T & { attempts: number };

export type SignUpFormState = AuthFormState & {
  firstName: string;
  lastName: string;
  email: string;
  errors?: AuthFormErrors & {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };
};

export type ExtraInfoSignUpFormState = AuthFormState & {
  phoneNumber: string;
  address: string;
  apptNumber: number;
  state: string;
  county: string;
  zipCode: number;
  errors?: AuthFormErrors & {
    phoneNumber?: string;
    address?: string;
    apptNumber?: string;
    state?: string;
    county?: string;
    zipCode?: string;
  };
};

export type LoginFormState = AuthFormState & {
  email: string;
  errors?: AuthFormErrors & {
    email?: string;
    password?: string;
  };
};
