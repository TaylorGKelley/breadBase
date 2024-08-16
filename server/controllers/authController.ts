import { NextFunction, Request, Response } from 'express';
import { createSendToken } from '../utils/jwtFunctions';
import User from '../models/userModel';

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
        name: user.name,
        profilePhoto: user.profilePhoto,
      },
    },
  });
};

export const signOut = async (req: Request, res: Response) => {
  // res.status(200).clearCookie('jwt').json({
  //   status: 'signed out',
  //   message: 'User successfully signed out',
  // });
  req.logout((err: any) => console.log('logged out'));
  res.redirect('/');
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, profilePhoto } = req.body;

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
      name,
      email,
      password,
      profilePhoto,
    });

    createSendToken(newUser._id, res);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          email: newUser.email,
          name: newUser.name,
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
