import mongoose, { Types } from 'mongoose';
import ProductSubDocument from './productSubDocument';

type BakeryDocument = mongoose.Document & {
  title: string;
  bakerySignIn: Types.ObjectId;
  acceptsToGoOrders: boolean;
  saves: number;
  about: string;
  location: [number, number];
  address: string;
  suiteNumber: number;
  state: string;
  city: string;
  zipCode: number;
  contactPhone: number;
  products: ProductSubDocument[];
};

export default BakeryDocument;
