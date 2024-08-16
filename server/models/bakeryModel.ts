import { model, Schema } from 'mongoose';
import Bakery from '../types/Bakery';
import validator from 'validator';
import productSchema from './productSchema';

const bakerySchema = new Schema<Bakery>({
  title: {
    type: Schema.Types.String,
    required: [true, 'Bakery needs a title'],
  },
  acceptsToGoOrders: Schema.Types.Boolean,
  saves: { type: Schema.Types.Number, default: 0 },
  about: Schema.Types.String,
  address: Schema.Types.String,
  suiteNumber: Schema.Types.Number,
  state: Schema.Types.String,
  city: Schema.Types.String,
  zipCode: {
    type: Schema.Types.Number,
    validate: [
      function (val: number) {
        validator.isPostalCode(val.toString(), 'US');
      },
      'Please provide a valid Zip Code',
    ],
  },
  contactPhone: {
    type: Schema.Types.Number,
    validate: [validator.isMobilePhone, 'Please provide a valid Phone Number'],
  },
  products: [productSchema],
});

const BakeryModel = model<Bakery>('Bakery', bakerySchema);

export default BakeryModel;
