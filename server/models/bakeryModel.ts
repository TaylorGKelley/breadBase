import { model, Schema } from 'mongoose';
import Bakery from '../types/Bakery';
import validator from 'validator';
import { UserRole } from '../types/User';
import ReviewSchema from './reviewSchema';

const bakerySchema = new Schema<Bakery>({
  title: {
    type: Schema.Types.String,
    required: [true, 'Bakery needs a title'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Bakery must have an owner assigned to it'],
    unique: [true, 'User cannot be an owner of more than one bakery'],
  },
  bakers: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: Schema.Types.String,
        enum: UserRole,
      },
    },
  ],
  acceptsToGoOrders: { type: Schema.Types.Boolean, default: false },
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
  deleted: { type: Schema.Types.Boolean, default: false },
  reviews: [ReviewSchema],
});

const BakeryModel = model<Bakery>('Bakery', bakerySchema);

export default BakeryModel;
