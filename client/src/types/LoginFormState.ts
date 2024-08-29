import User from './User';

type LoginFormState = {
  success: boolean;
  email: string;
  errors?: {
    message?: string;
    email?: string;
    password?: string;
  };
  user?: User;
};

export default LoginFormState;
