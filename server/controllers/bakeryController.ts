import { Request, Response } from 'express';
import { ProtectedUser } from '../types/User';
import Bakery from '../models/bakeryModel';
import { UserRole } from '../types/User';
import { addUserToBakery } from '../utils/associateUserWithBakery';

export const createBakery = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = req.user as ProtectedUser;

    const newBakery = await Bakery.create({
      ...req.body,
      owner: userId,
    });

    await addUserToBakery(userId, UserRole.bakeryOwner, newBakery._id, req);

    res.status(200).json({
      status: 'success',
      data: {
        bakery: newBakery,
      },
      user: (req.user as ProtectedUser).associatedBakeryId,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};
