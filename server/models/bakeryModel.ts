import { InferSchemaType, model, Schema } from 'mongoose';

const schemaDefinition = {
  title: { type: String, required: [true, 'Bakery needs a title'] },
  saves: { type: Number, default: 0 },
  about: String,
  location: { type: 'Point', coordinates: [0, 0] },
  address: {
    type: String,
    required: [true, 'Bakery needs a contact email'],
  },
  contact: {
    type: {
      type: String,
      enum: ['Phone', 'Email'],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    required: [true, 'Bakery needs a contact'],
  },
  products: [],
} as const;

const schema = new Schema(schemaDefinition);

const BakeryModel = model('Bakery', schema);
export type BakeryModelType = InferSchemaType<typeof schemaDefinition>;

export default BakeryModel;
