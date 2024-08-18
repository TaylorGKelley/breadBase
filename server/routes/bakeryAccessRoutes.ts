import { Router } from 'express';
import { allowedUsers, protectRoute } from '../middleware/authorizeRoutes';
import { UserRole } from '../types/User';
import {
  acceptBakerInvite,
  inviteBaker,
  leaveBakery,
  removeBaker,
} from '../controllers/bakeryAccessController';
import isNotBaker from '../middleware/isNotBaker';

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
  isNotBaker,
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

router.post(
  '/removeBaker',
  protectRoute,
  allowedUsers(UserRole.bakeryOwner, UserRole.siteAdmin, UserRole.bakeryAdmin),
  removeBaker,
);

// Todo: Transfer bakery ownership route

export default router;
