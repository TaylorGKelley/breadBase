import { Router } from 'express';
import { allowedUsers, protectRoute } from '../middleware/authorizeRoutes';
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipeController';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from '../controllers/reviewController';
import RecipeModel from '../models/recipeModel';
import { UserRole } from '../types/User';

const router = Router();

// * Recipe routes
router.route('/').get(getAllRecipes).post(protectRoute, createRecipe);

router
  .route('/:id')
  .get(getRecipeById)
  .patch(updateRecipe)
  .delete(deleteRecipe);

// * Recipe Review routes
router
  .route('/:id/review')
  .get(getAllReviews(RecipeModel))
  .post(
    protectRoute,
    allowedUsers(UserRole.defaultUser),
    createReview(RecipeModel),
  );

router
  .route('/:id/review/:reviewId')
  .get(getReview(RecipeModel))
  .patch(
    protectRoute,
    allowedUsers(UserRole.defaultUser),
    updateReview(RecipeModel),
  )
  .delete(
    protectRoute,
    allowedUsers(UserRole.defaultUser),
    deleteReview(RecipeModel),
  );

router.all('*', (req, res, next) =>
  res.status(404).json({ error: 'could not find route for that request' }),
);

export default router;
