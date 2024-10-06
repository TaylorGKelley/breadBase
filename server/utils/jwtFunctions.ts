import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Types } from 'mongoose';

const signToken = (id: Types.ObjectId) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } else {
    throw new Error('JWT_SECRET not defined in .env config file');
  }
};

export const createSendToken = (id: Types.ObjectId, res: Response) => {
  if (!process.env?.JWT_COOKIE_EXPIRES_IN) {
    return res.status(500).json({
      status: 'fail',
      error: 'Can not find environment variable for JWT_COOKIE_EXPIRES_IN',
    });
  }

  const token = signToken(id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    path: '/',
  };

  res.cookie('jwt', token, cookieOptions);
};
