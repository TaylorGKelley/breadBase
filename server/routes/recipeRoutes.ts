import { Router } from 'express';

import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipeController';
import {
  getAllReviewsForRecipe,
  createReviewForRecipe,
  deleteReviewForRecipe,
  updateReviewForRecipe,
  getSingleReviewForRecipe,
} from '../controllers/recipeReviewController';

const router = Router();

// recipe routes
router.route('/').get(getAllRecipes).post(createRecipe);

router
  .route('/:id')
  .get(getRecipeById)
  .patch(updateRecipe)
  .delete(deleteRecipe);

// review routes
router
  .route('/:recipeId/review')
  .get(getAllReviewsForRecipe)
  .post(createReviewForRecipe);

router
  .route('/:recipeId/review/:reviewId')
  .get(getSingleReviewForRecipe)
  .patch(updateReviewForRecipe)
  .delete(deleteReviewForRecipe);

router.all('*', (req, res, next) =>
  res.status(404).json({ message: 'could not find route for that request' }),
);

export default router;
