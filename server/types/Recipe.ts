import { Document, Types } from 'mongoose';
import BakeryDocument from './Bakery';
import Review from './Review';

type Recipe = Document & {
  title: string;
  bakery: Types.ObjectId | BakeryDocument;
  reviews: Types.DocumentArray<Review>;
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
