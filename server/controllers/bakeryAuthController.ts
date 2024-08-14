import { NextFunction, Request, Response } from 'express';
import { createSendToken } from '../utils/jwtFunctions';
import BakerySignIn from '../models/bakerySignInModel';

export const signInBakery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      res
        .status(400)
        .send(`Please provide ${!email ? 'an email' : 'a password'}`),
    );
  }

  const bakery = await BakerySignIn.findOne({ bakeryEmail: email }).select(
    '+password',
  );

  if (
    !bakery ||
    !(await bakery.correctPassword(password, bakery.bakeryPassword))
  ) {
    return next(new Error('Incorrect email or password'));
  }

  createSendToken(bakery, 201, res);
};

export const signOut = async (req: Request, res: Response) => {
  res.status(200).clearCookie('jwt').json({
    status: 'signed out',
    message: 'User successfully signed out',
  });
};

export const signUpBakery = async (req: Request, res: Response) => {
  try {
    const newBakery = await BakerySignIn.create({
      bakeryEmail: req.body.email,
      bakeryPassword: req.body.password,
      bakeryPasswordConfirm: req.body.passwordConfirm,
    });

    newBakery.bakeryPassword = 'null';

    res.status(201).json({
      status: 'success',
      data: {
        user: newBakery,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Bakery is most likely already create',
      message: (error as Error).name,
    });
  }
};

// Configure Authorization for this before enabling
export const deleteBakery = async (req: Request, res: Response) => {
  try {
    if (req.params.id === req.user?._id.toString()) {
      const deletedBakery = await BakerySignIn.findByIdAndDelete(req.params.id);

      if (deletedBakery) {
        res.status(200).json({
          status: 'success',
          data: null,
        });
      } else {
        throw new Error('Cannot find Bakery with that Id');
      }
    } else {
      throw new Error('Cannot delete a bakery you do not own');
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};
