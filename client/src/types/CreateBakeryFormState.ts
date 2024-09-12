import Bakery from './Bakery';
import User from './User';

type CreateBakeryFormState = {
  success: boolean;
  title: string;
  address: string;
  suiteNumber?: number;
  state?: string;
  city?: string;
  zipCode?: number;
  errors?: {
    message?: string;
    title?: string;
    address?: string;
    suiteNumber?: string;
    state?: string;
    city?: string;
    zipCode?: string;
  };
  bakery?: Bakery;
  user?: User;
};

export default CreateBakeryFormState;
