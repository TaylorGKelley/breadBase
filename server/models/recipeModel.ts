import { Schema, model, InferSchemaType } from 'mongoose';

const reviewSchemaDefinition = new Schema({
  userName: {
    type: String,
    required: [true, 'Review needs a username'],
  },
  rating: { type: Number, required: [true, 'Review needs a rating'] },
  review: { type: String },
});

const recipeSchemaDefinition = {
  title: { type: String, required: [true, 'A recipe must have a title'] },
  bakery: {
    type: Schema.Types.ObjectId,
    ref: 'Bakery',
    required: [true, 'You must be part of a bakery to share a recipe'],
  },
  reviews: [reviewSchemaDefinition],
  imageBase: { type: Buffer, required: [true, 'Recipe needs an image'] },
  description: [
    {
      heading: { type: String, required: true },
      body: { type: String },
      image: { type: Buffer },
    },
  ],
  prepTime: {
    type: {
      hours: { type: Number },
      minutes: { type: Number },
    },
    required: [true, 'Recipe needs a prep time'],
  },
  cookTime: {
    type: {
      hours: { type: Number },
      minutes: { type: Number },
    },
    required: [true, 'Recipe needs a cook time'],
  },
  downTime: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
  },
  servings: { type: Number, min: 1 },
  tags: [String],
  ingredients: {
    type: [
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
    required: [true, 'Recipe needs at least one ingredient'],
  },
  directions: {
    type: [String],
    required: [true, 'Recipe needs at least one direction'],
  },
  notes: [String],
} as const;

const schema = new Schema(recipeSchemaDefinition);

schema.pre(
  ['find', 'findOne', 'findOneAndUpdate', 'findOneAndDelete'],
  function (next) {
    this.populate({ path: 'bakery', select: 'title' });

    next();
  },
);

schema.post('save', function (doc, next) {
  doc.populate('bakery', 'title').then(() => {
    next();
  });

  next();
});

const RecipeModel = model('Recipe', schema);
export type RecipeModelType = InferSchemaType<typeof recipeSchemaDefinition>;

export default RecipeModel;
