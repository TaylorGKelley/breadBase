import { Schema, model } from 'mongoose';
import Recipe from '../types/Recipe';
import ReviewSchema from './reviewSchema';

const schema = new Schema<Recipe>({
  title: { type: String, required: [true, 'A recipe must have a title'] },
  bakery: {
    type: Schema.Types.ObjectId,
    ref: 'Bakery',
    required: [true, 'You must be part of a bakery to share a recipe'],
  },
  publicRecipe: {
    type: Schema.Types.Boolean,
    default: false,
  },
  imageBase: { type: Buffer, required: [true, 'Recipe needs an image'] },
  description: [
    {
      heading: { type: String, required: true },
      body: { type: String },
      image: { type: Buffer },
    },
  ],
  prepTimeMinutes: {
    type: Number,
    required: [true, 'Recipe needs a prep time'],
  },
  cookTimeMinutes: {
    type: Number,
    required: [true, 'Recipe needs a cook time'],
  },
  downTimeMinutes: Number,
  servings: { type: Number, min: 1, default: 1 },
  tags: [String],
  ingredients: [
    {
      amount: {
        type: String,
        required: [true, 'Ingredient needs an amount'],
      },
      description: {
        type: String,
        required: [true, 'Ingredient needs a description'],
      },
      note: { type: String },
    },
  ],
  directions: {
    type: [String],
    required: [true, 'Recipe needs at least one direction'],
  },
  notes: [String],
  reviews: [ReviewSchema],
});

schema.pre(['find', 'findOne', 'findOneAndUpdate'], function (next) {
  this.populate({ path: 'bakery', select: 'title' });

  next();
});

const RecipeModel = model<Recipe>('Recipe', schema);

export default RecipeModel;
