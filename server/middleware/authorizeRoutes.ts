import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { type ProtectedUser, UserRole } from '../types/User';

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: 'You are not authorized to perform this action',
      });
    }

    if (process.env?.JWT_SECRET) {
      try {
        const decoded: jwt.JwtPayload = jwt.verify(
          token,
          process.env?.JWT_SECRET,
        ) as jwt.JwtPayload;
        const currentUser = await User.findById((decoded as jwt.JwtPayload).id);
        if (!currentUser) {
          return res
            .status(401)
            .send({
              status: 'Failed to Authenticate', 
              message:'The user belonging to this token no longer exists.'
            });
        }

        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return res
            .status(401)
            .json({
              status: 'Failed to Authenticate',
              message: 'User recently changed password. Please login again.',
            });
        }

        req.user = {
          _id: currentUser._id,
          email: currentUser.email,
          role: currentUser.role,
          associatedBakery: currentUser.associatedBakery,
        };
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }

      next();
    } else {
      next(new Error('No JWT_SECRET defined within .env file'));
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: `${(error as Error).message} -- Try logging in`,
    });
  }
};

export const allowedUsers = (...roles: string[]) => {
  // Site admin is always allowed
  if (!roles.includes(UserRole.siteAdmin)) roles.push(UserRole.siteAdmin);

  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req.user as ProtectedUser)?.role || '')) {
      return res.status(401).send('Not authorized to view this route');
    }

    next();
  };
};
