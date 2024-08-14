import mongoose, { Types } from 'mongoose';
import BakeryDocument from './BakeryDocument';

export type RecipeReviewSubDocument = mongoose.Document & {
  userName: string;
  rating: number;
  review?: string;
};

type RecipeDocument = mongoose.Document & {
  title: string;
  bakery: Types.ObjectId | BakeryDocument;
  reviews: RecipeReviewSubDocument;
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

export default RecipeDocument;
