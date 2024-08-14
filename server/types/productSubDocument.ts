import mongoose, { Schema } from 'mongoose';

type ProductSubDocument = mongoose.Document & {
  name: string;
  price: number;
  description: string;
  images?: { isFavorite: boolean; image: Schema.Types.Buffer }[];
  ingredients?: string[];
  nutrition?: {
    calories: string;
    fats: string;
    carbs: string;
    protiens: string;
  };
};

export default ProductSubDocument;
