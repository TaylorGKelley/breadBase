import { Request, Response } from 'express';
import { Document, Model, Types } from 'mongoose';
import { ProtectedUser } from '../types/User';
import Review from '../types/Review';

type DocumentWithReviews = Document & {
  reviews: Types.DocumentArray<Review>;
};

export const getAllReviews = <T extends DocumentWithReviews>(
  Model: Model<T>,
) => {
  return async (req: Request, res: Response) => {
    try {
      const document = (await Model.findById(
        req.params.id,
      )) as unknown as DocumentWithReviews;

      res.status(200).json({
        status: 'success',
        data: {
          reviews: document.reviews,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        error: (error as Error).message,
      });
    }
  };
};

export const getReview = <T extends DocumentWithReviews>(Model: Model<T>) => {
  return async (req: Request, res: Response) => {
    try {
      const document = await Model.findById(req.params.id);

      const review = document?.reviews?.id(req.params.reviewId);

      if (review) {
        res.status(200).json({
          status: 'success',
          data: {
            review,
          },
        });
      } else {
        res.status(404).json({
          status: 'fail',
          error: 'Could not find a review with that Id',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'Could not retrieve review with error:',
        error: (error as Error).message,
      });
    }
  };
};

export const createReview = <T extends DocumentWithReviews>(
  Model: Model<T>,
) => {
  return async (req: Request, res: Response) => {
    try {
      const userId = (req.user as ProtectedUser)._id;

      const document = await Model.findById(req.params.id);
      const existingReview = document?.reviews?.find(
        (review: Review) => review.userId === userId,
      );

      if (!existingReview) {
        document?.reviews?.push({
          userId,
          ...req.body,
        });
        const review = document?.reviews?.at(-1);
        await document?.save();

        res.status(200).json({
          message: 'Review created',
          data: {
            review,
          },
        });
      } else {
        res.status(400).json({
          status: 'fail',
          error: 'User already posted a review',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        error: (error as Error).message,
      });
    }
  };
};

export const updateReview = <T extends DocumentWithReviews>(
  Model: Model<T>,
) => {
  return async (req: Request, res: Response) => {
    try {
      const document = await Model.findById(req.params.id);

      const review = document?.reviews?.id(req.params.reviewId);

      if (review) {
        review.updateOne({ ...req.body, edited: true });
        await document?.save();

        res.status(200).json({
          message: 'Review Updated',
          data: {
            review,
          },
        });
      } else {
        res.status(404).json({
          status: 'Cannot find review',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        error: (error as Error).message,
      });
    }
  };
};

export const deleteReview = <T extends DocumentWithReviews>(
  Model: Model<T>,
) => {
  return async (req: Request, res: Response) => {
    try {
      const document = await Model.findById(req.params.id);

      const review = document?.reviews?.id(req.params.reviewId);

      if (review) {
        review.deleteOne();
        await document?.save();

        res.status(200).json({
          message: 'Review Removed',
          data: null,
        });
      } else {
        res.status(404).json({ status: 'fail', error: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({
        status: `Failed to create item with error,`,
        error: (error as Error).message,
      });
    }
  };
};
