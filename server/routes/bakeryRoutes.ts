import { Router } from 'express';
import {
  allowedUsers,
  protectRoute,
} from '../utils/authorizeRoutes.middleware';
import { UserRole } from '../types/User';
import {
  acceptBakerInvite,
  createBakery,
  inviteBaker,
} from '../controllers/bakeryController';

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

router.post('/accept/invite/:inviteCode', acceptBakerInvite);

export default router;
