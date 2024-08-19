import { Document, Types } from 'mongoose';
import Review from './Review';

type Recipe = Document & {
  title: string;
  bakery: Types.ObjectId;
  publicRecipe: boolean;
  imageBase?: Types.Buffer;
  description: {
    heading: string;
    body?: string;
    image?: Types.Buffer;
  }[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  downTimeMinutes?: number;
  servings: number;
  tags: string[];
  ingredients: {
    amount: string;
    description: string;
    note?: string;
  }[];
  directions: [string];
  notes: [string];
  reviews: Types.DocumentArray<Review>;
};

export default Recipe;
