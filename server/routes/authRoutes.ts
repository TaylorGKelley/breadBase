import { Router } from 'express';
import {
  authenticateGoogle,
  registerUser,
  signIn,
  logOut,
  forgotPassword,
  resetPassword,
  updatePassword,
  checkUserIsAuthenticated,
} from '../controllers/authController';
import passport from 'passport';
import { protectRoute } from '../middleware/authorizeRoutes';

const router = Router();

// Create/SignIn/Logout User
router.get('/checkAuth', protectRoute, checkUserIsAuthenticated);
router.post('/signin', signIn);
router.post('/logOut', logOut);
router.post('/register', registerUser);

// Google OAuth
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
  authenticateGoogle,
);

// Reset password
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.post('/updatePassword', protectRoute, updatePassword);

export default router;
