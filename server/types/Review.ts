import { ObjectId } from 'mongoose';

type Review = {
  userId: ObjectId;
  rating: number;
  review?: string;
};

export default Review;
