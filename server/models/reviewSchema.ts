import { Schema } from 'mongoose';
import Review from '../types/Review';

const ReviewSchema = new Schema<Review>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review needs an associated user'],
  },
  rating: { type: Number, required: [true, 'Review needs a rating'] },
  reviewTitle: { type: String, required: [true, 'Review needs a title'] },
  review: String,
  edited: { type: Boolean, default: false },
});

export default ReviewSchema;
