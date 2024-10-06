import { Router } from 'express';
import { allowedUsers, protectRoute } from '../middleware/authorizeRoutes';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from '../controllers/reviewController';
import ProductModel from '../models/productModel';
import { UserRole } from '../types/User';

const router = Router();

// * Product routes
router.route('/all/:bakeryId').get(getAllProducts);

router.route('/').post(protectRoute, allowedUsers(UserRole.bakeryAdmin, UserRole.bakeryManage, UserRole.bakeryOwner), createProduct);
router.route('/:id')
  .get(getProductById)
  .patch(protectRoute, allowedUsers(UserRole.bakeryAdmin, UserRole.bakeryManage, UserRole.bakeryOwner), updateProduct)
  .delete(protectRoute, allowedUsers(UserRole.bakeryAdmin, UserRole.bakeryManage, UserRole.bakeryOwner), deleteProduct);

// * Product Review routes
router
  .route('/:id/review')
  .get(getAllReviews(ProductModel))
  .post(
    protectRoute,
    allowedUsers(UserRole.defaultUser),
    createReview(ProductModel),
  );

router
  .route('/:id/review/:reviewId')
  .get(getReview(ProductModel))
  .patch(
    protectRoute,
    allowedUsers(UserRole.defaultUser),
    updateReview(ProductModel),
  )
  .delete(
    protectRoute,
    allowedUsers(UserRole.defaultUser),
    deleteReview(ProductModel),
  );

router.all('*', (req, res, next) =>
  res.status(404).json({ 
    error: 'could not find route for that request' 
  }),
);

export default router;
