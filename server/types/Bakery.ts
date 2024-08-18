import { Document, ObjectId } from 'mongoose';
import Product from './Product';
import { UserRole } from './User';
import Review from './Review';

type Bakery = Document & {
  title: string;
  owner: ObjectId;
  bakers: {
    userId: ObjectId;
    role: UserRole;
  }[];
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
  products: ObjectId[];
  reviews: Review[];
};

export default Bakery;
