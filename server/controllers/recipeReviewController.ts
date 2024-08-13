import { Request, Response } from 'express';
import Recipe from '../models/recipeModel';

export const getAllReviewsForRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    const reviews = recipe?.reviews;

    if (reviews) {
      res.status(200).json({
        message: 'All reviews for recipe',
        data: {
          reviews,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'No reviews for recipe',
      });
    }
  } catch (error) {
    res.status(404).json({
      status: `Failed to get reviews for this recipe,`,
      error: (error as Error).message,
    });
  }
};

export const getSingleReviewForRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    const review = recipe?.reviews?.id(req.params.reviewId);

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
        message: 'Could not find a review with that Id',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Could not retrieve review with error:',
      error: (error as Error).message,
    });
  }
};

export const createReviewForRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe?.reviews?.find((doc) => doc.userName === req.body?.userName)) {
      recipe?.reviews?.push(req.body);
      const review = recipe?.reviews?.at(-1);
      await recipe?.save();

      res.status(200).json({
        message: 'Review Added to Recipe',
        data: {
          review,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'User already posted a review',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: `Failed to create item with error,`,
      error: (error as Error).message,
    });
  }
};

export const updateReviewForRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    const review = recipe?.reviews?.id(req.params.reviewId);

    if (review) {
      review.updateOne(req.body);
      await recipe?.save();

      res.status(200).json({
        message: 'Review Updated for Recipe',
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
      status: 'Failed to update item with error:',
      error: (error as Error).message,
    });
  }
};

export const deleteReviewForRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    const review = recipe?.reviews?.id(req.params.reviewId);

    if (review) {
      review.deleteOne();
      await recipe?.save();

      res.status(200).json({
        message: 'Review Removed from Recipe',
        data: null,
      });
    } else {
      res.status(404).json({ status: 'fail', message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({
      status: `Failed to create item with error,`,
      error: (error as Error).message,
    });
  }
};
