import { Router } from 'express';
import { allowedUsers, protectRoute } from '../middleware/authorizeRoutes';
import { UserRole } from '../types/User';
import {
  acceptBakerInvite,
  createBakery,
  inviteBaker,
} from '../controllers/bakeryController';
import isBaker from '../middleware/isBaker';

const router = Router();

// Simple Bakery routes
router.route('/').get().post(protectRoute, createBakery);
router.route('/:id').get().patch().delete();

// Invite Baker
router.post(
  '/invite',
  protectRoute,
  allowedUsers(UserRole.bakeryOwner),
  inviteBaker,
);
router.post(
  '/invite/accept/:inviteCode',
  protectRoute,
  isBaker,
  acceptBakerInvite,
);

export default router;
