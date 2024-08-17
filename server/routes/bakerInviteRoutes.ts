import { Router } from 'express';
import { allowedUsers, protectRoute } from '../middleware/authorizeRoutes';
import { UserRole } from '../types/User';
import {
  acceptBakerInvite,
  inviteBaker,
  leaveBakery,
} from '../controllers/bakerInviteController';
import isBaker from '../middleware/isBaker';

const router = Router();

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

router.post(
  '/leave',
  protectRoute,
  allowedUsers(
    UserRole.bakeryAdmin,
    UserRole.bakeryManage,
    UserRole.bakeryView,
  ),
  leaveBakery,
);

export default router;
