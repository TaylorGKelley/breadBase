import { Router } from 'express';

import {
  getAllRecipes,
  getRecipeById,
} from '../controllers/recipeController.js';

const router = Router();

router.route('/').get(getAllRecipes).post();
router.route('/:id').get(getRecipeById).patch().delete();

router.all('*', (req, res, next) =>
  res.status(404).json({ message: 'could not find route for that request' }),
);

export default router;
