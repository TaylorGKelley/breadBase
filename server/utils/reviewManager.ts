import { ObjectId, Document } from 'mongoose';
import Review from '../types/Review';

type DocumentWithReviews = Document & {
  reviews?: Review[];
};

export const addReview = <T extends DocumentWithReviews>(
  review: Review,
  document: T,
) => {
  const reviewExists = document.reviews?.find(
    (reviewItem: Review) => reviewItem.userId === review.userId,
  );

  if (!reviewExists) {
    document.reviews?.push(review);
    document.save();
  } else {
    throw new Error('User already posted a review');
  }
};

export const removeReview = <T extends DocumentWithReviews>(
  document: T,
  reviewId: ObjectId,
) => {
  document.reviews = document.reviews?.filter(
    (review: Review) => review._id === reviewId,
  );
  document.save();
};

export const updateReview = <T extends DocumentWithReviews>(
  document: T,
  reviewId: ObjectId,
  review: Review,
) => {
  document.reviews = document.reviews?.map((reviewItem: Review) => {
    if (reviewItem._id === reviewId) {
      return review;
    }
    return reviewItem;
  });
  document.save();
};

// ? Might not need this function
export const getReview = <T extends DocumentWithReviews>(
  document: T,
  reviewId: ObjectId,
) => {
  return document.reviews?.find((review: Review) => review._id === reviewId);
};
