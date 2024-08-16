import { Document, Types } from 'mongoose';

type Product = Document & {
  name: string;
  price: number;
  description: string;
  images?: { isFavorite: boolean; image: Types.Buffer }[];
  ingredients?: string[];
  nutrition?: {
    calories: string;
    fats: string;
    carbs: string;
    protiens: string;
  };
};

export default Product;
