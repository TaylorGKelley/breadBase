import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { createSendToken } from '../utils/jwtFunctions';
import User from '../models/userModel';
import { ProtectedUser } from '../types/User';

export const checkUserIsAuthenticated = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'You are logged in',
    data: {
      user: req.user as ProtectedUser,
    },
  });
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email) {
    return next(res.status(400).send(`Please provide an email'}`));
  }

  const user = await User.findOne({ email }).select('+password');

  if (user?.googleId) {
    res.status(401).json({
      message: 'Please try logging in with google',
    });
  } else if (!password) {
    res.status(401).json({
      message: 'Please provide a password',
    });
  }

  if (!user || !(await user.correctPassword(password, user.password || ''))) {
    return res
      .status(401)
      .json({ message: `Incorrect ${!user ? 'email' : 'password'}` });
  }

  createSendToken(user._id, res);
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    data: {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        profilePhoto: user.profilePhoto,
      },
    },
  });
};

export const logOut = async (req: Request, res: Response) => {
  // res.status(200).clearCookie('jwt').json({
  //   status: 'signed out',
  //   message: 'User successfully signed out',
  // });
  req.user = undefined;
  req.logout((err: any) => console.log('User logged out'));
  res.clearCookie('jwt', { path: '/' }).json({
    message: 'User successfully logged out',
    data: { user: null },
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { displayName, firstName, lastName, email, password, profilePhoto } =
    req.body;

  if (req.body.password !== req.body.passwordConfirm || !req.body.password)
    return res.status(500).send('Passwords do not match');

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: 'failed to create user',
        message: 'User already exists',
      });
    }

    const newUser = await User.create({
      displayName,
      firstName,
      lastName,
      email,
      password,
      profilePhoto,
    });

    createSendToken(newUser._id, res);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          displayName: newUser.displayName,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          profilePhoto: newUser.profilePhoto,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || user.googleId) {
    return res.status(404).json({
      message: 'Invalid email address',
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // IMPLEMENT EMAILER -- Email LINK to user with reset token
  // FOR TESTING
  res.sendStatus(201);
  // FOR TESTING
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;

    if (token) {
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          message: 'Token is invalid or has expired',
        });
      }

      const { password, passwordConfirm } = req.body;

      if (!password) {
        return res.status(401).json({
          message: 'Request does not contain new password',
        });
      }

      user.password = password;
      user.passwordConfirm = passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      await user.save({});

      createSendToken(user._id, res);

      res.status(201).json({
        status: 'success',
        data: {
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            profilePhoto: user.profilePhoto,
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const user = await User.findById((req.user as any)?._id).select('+password');

  if (!user) {
    return res.status(404).send('User with that ID does not exist');
  }

  if (
    !(await user?.correctPassword(
      req.body.passwordCurrent,
      user.password || '',
    ))
  ) {
    return res.status(401).json({
      message: 'Current password is incorrect',
    });
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user._id, res);

  res.status(201).json({
    message: 'Password successfully updated',
  });
};

export const authenticateGoogle = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    if (user) {
      createSendToken((user as any).id, res);

      res.status(201).json({
        status: 'success',
        message: 'Google user successfully authenticated',
      });
    } else {
      throw new Error('Error reading user data');
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};
