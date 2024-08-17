import { Router } from 'express';
import { protectRoute } from '../middleware/authorizeRoutes';
import { createBakery } from '../controllers/bakeryController';

const router = Router();

// Simple Bakery routes
router.route('/').get().post(protectRoute, createBakery);
router.route('/:id').get().patch().delete();

export default router;
