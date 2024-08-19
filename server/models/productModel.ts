import { model, Schema } from 'mongoose';
import Product from '../types/Product';
import validator from 'validator';
import ReviewSchema from './reviewSchema';

const productSchema = new Schema<Product>({
  name: {
    types: Schema.Types.String,
    unique: true,
    required: [true, 'Product requires a name'],
  },
  bakery: {
    type: Schema.Types.ObjectId,
    ref: 'Bakery',
  },
  price: {
    types: Schema.Types.String,
    required: [true, 'Product must have a price'],
    validate: [validator.isCurrency, 'Please provide a valid currency'],
  },
  description: {
    types: Schema.Types.String,
    required: [true, 'Product needs a description'],
  },
  images: [{ isFavorite: Schema.Types.Boolean, image: Schema.Types.Buffer }],
  ingredients: [Schema.Types.String],
  nutrition: {
    calories: { types: Schema.Types.String },
    fats: { types: Schema.Types.String },
    carbs: { types: Schema.Types.String },
    protiens: { types: Schema.Types.String },
  },
  reviews: [ReviewSchema],
});

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;
