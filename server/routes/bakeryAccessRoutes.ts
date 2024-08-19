import { Router } from 'express';
import { allowedUsers, protectRoute } from '../middleware/authorizeRoutes';
import { UserRole } from '../types/User';
import {
  acceptBakerInvite,
  inviteBaker,
  leaveBakery,
  removeBaker,
  transferOwnership,
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

router.delete(
  '/leave',
  protectRoute,
  allowedUsers(
    UserRole.bakeryAdmin,
    UserRole.bakeryManage,
    UserRole.bakeryView,
  ),
  leaveBakery,
);

router.delete(
  '/removeBaker',
  protectRoute,
  allowedUsers(UserRole.bakeryOwner, UserRole.siteAdmin, UserRole.bakeryAdmin),
  removeBaker,
);

router.patch(
  '/transferOwnership',
  protectRoute,
  allowedUsers(UserRole.bakeryOwner, UserRole.siteAdmin),
  transferOwnership,
);

export default router;
