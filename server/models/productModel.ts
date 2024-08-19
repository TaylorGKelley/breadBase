import { model, Schema } from 'mongoose';
import Product from '../types/Product';
import validator from 'validator';
import ReviewSchema from './reviewSchema';

const productSchema = new Schema<Product>({
  name: {
    type: Schema.Types.String,
    unique: true,
    required: [true, 'Product requires a name'],
  },
  bakery: {
    type: Schema.Types.ObjectId,
    ref: 'Bakery',
  },
  price: {
    type: Schema.Types.String,
    required: [true, 'Product must have a price'],
    validate: [validator.isCurrency, 'Please provide a valid currency'],
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Product needs a description'],
  },
  images: [{ isFavorite: Schema.Types.Boolean, image: Schema.Types.Buffer }],
  ingredients: [Schema.Types.String],
  nutrition: {
    calories: { type: Schema.Types.String },
    fats: { type: Schema.Types.String },
    carbs: { type: Schema.Types.String },
    protiens: { type: Schema.Types.String },
  },
  reviews: [ReviewSchema],
});

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;
