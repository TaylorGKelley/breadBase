import { Document, Types, ObjectId } from 'mongoose';
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
  deleted: boolean;
  reviews: Types.DocumentArray<Review>;
};

export default Bakery;
