import mongoose, { Types } from 'mongoose';
import Product from './Product';

type Bakery = mongoose.Document & {
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
  products: Product[];
};

export default Bakery;
