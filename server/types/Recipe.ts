import mongoose, { Types } from 'mongoose';
import BakeryDocument from './Bakery';

export type RecipeReview = mongoose.Document & {
  userName: string;
  rating: number;
  review?: string;
};

type Recipe = mongoose.Document & {
  title: string;
  bakery: Types.ObjectId | BakeryDocument;
  reviews: RecipeReview;
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
};

export default Recipe;
