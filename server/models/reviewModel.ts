import { Schema } from 'mongoose';
import Review from '../types/Review';

const ReviewSchema = new Schema<Review>({
  userId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: [true, 'Review needs an associated user'],
  },
  rating: { type: Number, required: [true, 'Review needs a rating'] },
  review: { type: String },
});

export default ReviewSchema;
