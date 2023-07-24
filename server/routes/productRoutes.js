import { Router } from 'express';

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productController.js';

const router = Router();

router.route('/').get(getAllProducts).post(createProduct);

router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

router.all('*', (req, res, next) =>
  res.status(404).json({ message: 'could not find route for that request' }),
);

export default router;
