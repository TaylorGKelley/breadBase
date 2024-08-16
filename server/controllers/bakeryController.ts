import { Request, Response } from 'express';
import BakerInvite from '../models/bakerInviteModel';
import crypto from 'crypto';
import ProtectedUser from '../types/ProtectedUser';
import Bakery from '../models/bakeryModel';
import User from '../models/userModel';
import { UserRole } from '../types/User';

export const inviteBaker = async (req: Request, res: Response) => {
  const { email, type } = req.body;
  const { associatedBakeryId: bakeryId } = req.user as ProtectedUser;

  const inviteCode = crypto.randomBytes(32).toString('hex');

  const bakerInvite = new BakerInvite({
    bakeryId,
    email,
    type,
    inviteCode,
  });
  bakerInvite.save();

  // Email BakerInvite to ${email}
  res.status(200).json({
    invite: inviteCode,
    message: 'Invite sent',
  });
};

export const acceptBakerInvite = async (req: Request, res: Response) => {
  req.params.inviteCode;
};

export const createBakery = async (req: Request, res: Response) => {
  try {
    const { associatedBakeryId, _id: userId } = req.user as ProtectedUser;

    const newBakery = await Bakery.create({
      ...req.body,
      _id: associatedBakeryId,
      owner: userId,
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        associatedBakery: associatedBakeryId,
        role: UserRole.bakeryOwner,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    res.status(200).json({
      status: 'success',
      data: {
        bakery: newBakery,
      },
      user: (req.user as ProtectedUser).associatedBakeryId,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};
