import { ObjectId } from 'mongoose';

type Review = {
  userId: ObjectId;
  rating: number;
  reviewTitle: string;
  review?: string;
  edited: boolean;
};

export default Review;
