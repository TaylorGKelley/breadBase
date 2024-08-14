import jwt from 'jsonwebtoken';
import { Response } from 'express';
import BakerySignInDocument from '../types/BakerySignInDocument';

const signToken = (id: number) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } else {
    throw new Error('JWT_SECRET not defined in .env config file');
  }
};

export const createSendToken = (
  bakery: BakerySignInDocument,
  statusCode: number,
  res: Response,
) => {
  if (process.env?.JWT_COOKIE_EXPIRES_IN) {
    const token = signToken(bakery._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() +
          (parseInt(process.env?.JWT_COOKIE_EXPIRES_IN) || 90) *
            24 *
            60 *
            60 *
            1000,
      ),
      httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);

    bakery.bakeryPassword = 'null';

    res.status(statusCode).json({
      status: 'success',
      data: {
        bakery,
      },
    });
  }
};
