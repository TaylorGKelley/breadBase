import { Router } from 'express';

import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from '../controllers/recipeController.js';

const router = Router();

router.route('/').get(getAllRecipes).post(createRecipe);

router
  .route('/:id')
  .get(getRecipeById)
  .patch(updateRecipe)
  .delete(deleteRecipe);

export default router;
