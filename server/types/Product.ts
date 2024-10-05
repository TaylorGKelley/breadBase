import { Document, ObjectId, Types } from 'mongoose';
import Review from './Review';

type Product = Document & {
  name: string;
  bakery: ObjectId;
  price: string;
  description: string;
  image?: { name: string; base: string };
  ingredients?: string[];
  nutrition?: {
    calories: string;
    fats: string;
    carbs: string;
    protiens: string;
  };
  reviews: Types.DocumentArray<Review>;
};

export default Product;
