import { Router } from 'express';
import {
  authenticateGoogle,
  registerUser,
  signIn,
  signOut,
} from '../controllers/authController';
import passport from 'passport';

const router = Router();

router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/register', registerUser);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
  authenticateGoogle,
);

export default router;
