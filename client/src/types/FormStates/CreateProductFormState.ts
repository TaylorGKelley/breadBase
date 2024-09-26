import Product from '../Product';

type CreateProductFormState = {
  success: boolean;
  name: string;
  price: number | undefined;
  description?: string;
  images?: { isFavorite: boolean; image: string }[];
  ingredients?: string;
  nutrition?: {
    calories: string;
    fats: string;
    carbs: string;
    protiens: string;
  };
  errors?: {
    message?: string;
    name?: string;
    price?: string;
    description?: string;
    images?: string;
    ingredients?: string;
    nutrition?: string;
  };
  product?: Product;
};

export default CreateProductFormState;
