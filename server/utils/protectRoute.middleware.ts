import { NextFunction, Request, Response } from 'express';
import Bakery from '../models/bakeryModel';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send('You are not signed in');
  }

  if (process.env?.JWT_SECRET) {
    const decoded: jwt.JwtPayload = (await jwt.verify(
      token,
      process.env?.JWT_SECRET,
    )) as jwt.JwtPayload;

    const currentBakery = await Bakery.findById(decoded.id);
    if (!currentBakery) {
      return res
        .status(401)
        .send('The user belonging to this token no longer exists.');
    }

    if (currentBakery.changedPasswordAfter(decoded.iat)) {
      return res
        .status(401)
        .send('User recently changed password. Please login again.');
    }

    req.user = { _id: currentBakery._id, email: currentBakery.bakeryEmail };

    next();
  } else {
    next(new Error('No JWT_SECRET defined within .env file'));
  }
};
