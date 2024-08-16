import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send('You are not signed in');
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
          .send('The user belonging to this token no longer exists.');
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return res
          .status(401)
          .send('User recently changed password. Please login again.');
      }

      req.user = currentUser;
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }

    next();
  } else {
    next(new Error('No JWT_SECRET defined within .env file'));
  }
};
