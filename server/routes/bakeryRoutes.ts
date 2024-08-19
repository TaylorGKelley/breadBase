import { Router } from 'express';
import { allowedUsers, protectRoute } from '../middleware/authorizeRoutes';
import {
  createBakery,
  deleteBakery,
  getAllBakeries,
  reopenBakery,
  updateBakery,
} from '../controllers/bakeryController';
import { UserRole } from '../types/User';
import { createReview, getAllReviews } from '../controllers/reviewController';
import BakeryModel from '../models/bakeryModel';

const router = Router();

// * Bakery routes
router.route('/').get(getAllBakeries).post(protectRoute, createBakery);
router
  .route('/:id')
  .get()
  .patch(
    protectRoute,
    allowedUsers(UserRole.bakeryOwner, UserRole.siteAdmin),
    updateBakery,
  );
router.delete(
  '/close',
  protectRoute,
  allowedUsers(UserRole.bakeryOwner, UserRole.siteAdmin),
  deleteBakery,
);
router.patch(
  'reopen',
  protectRoute,
  allowedUsers(UserRole.bakeryOwner, UserRole.siteAdmin),
  reopenBakery,
);

// * Review routes for Bakery
router
  .route('/:id/review')
  .get(getAllReviews(BakeryModel))
  .post(
    protectRoute,
    allowedUsers(UserRole.defaultUser),
    createReview(BakeryModel),
  );

export default router;
