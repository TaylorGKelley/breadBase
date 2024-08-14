import { Types } from 'mongoose';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        _id: Types.ObjectId;
        email?: string;
        role?: string;
      };
    }
  }
}
