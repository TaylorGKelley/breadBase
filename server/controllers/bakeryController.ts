import { Request, Response } from 'express';
import BakerInvite from '../models/bakerInviteModel';
import crypto from 'crypto';
import { ProtectedUser } from '../types/User';
import BakeryCollection from '../models/bakeryModel';
import Bakery from '../types/Bakery';
import User from '../models/userModel';
import { UserRole } from '../types/User';
import { ObjectId } from 'mongoose';

export const inviteBaker = async (req: Request, res: Response) => {
  try {
    const { email, role, bakeryId } = req.body;
    // const { associatedBakeryId: bakeryId } = req.user as ProtectedUser; // ? Removed incase siteAdmin needs to invite someone, front end will manage bakery id

    if (!bakeryId) throw new Error('Bakery Id is required');

    const bakerInvite = new BakerInvite({
      bakeryId,
      email,
      role,
    });
    bakerInvite.save();

    // ! Email BakerInvite to ${email}
    res.status(200).json({
      invite: bakerInvite.inviteCode,
      message: 'Invite sent',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};

export const acceptBakerInvite = async (req: Request, res: Response) => {
  const inviteCode = req.params.inviteCode;

  try {
    const hashedInviteCode = crypto
      .createHash('sha256')
      .update(inviteCode)
      .digest('hex');

    console.log(hashedInviteCode);

    const inviteRecord = await BakerInvite.findOne({
      inviteCode: hashedInviteCode,
    });
    console.log(inviteRecord);

    if (!inviteRecord)
      return res.status(404).send('Invite code does not exist');

    if (!inviteRecord.validInviteCode(inviteRecord.date))
      return res.status(401).send('Invite code is expired');

    // Associate User with bakery
    console.log('inviteValid and recieved');
    await associateUserWithBakery(
      (req.user as ProtectedUser)._id,
      inviteRecord.role,
      inviteRecord.bakeryId,
      req,
    );

    res.status(200).json({
      status: 'success',
      message: 'Invite accepted',
      data: {
        bakery: {},
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};

export const createBakery = async (req: Request, res: Response) => {
  try {
    const { associatedBakeryId, _id: userId } = req.user as ProtectedUser;

    const newBakery = await BakeryCollection.create({
      ...req.body,
      // _id: associatedBakeryId, // TODO: Why is this here? Test it out
      owner: userId,
    });

    await associateUserWithBakery(
      userId,
      UserRole.bakeryOwner,
      newBakery._id,
      req,
    );

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

const associateUserWithBakery = async (
  userId: ObjectId,
  role: UserRole = UserRole.bakeryView,
  bakeryId: ObjectId,
  req: Request,
) => {
  const updatedUser = (await User.findByIdAndUpdate(
    userId,
    {
      associatedBakery: bakeryId,
      role,
    },
    {
      new: true,
      runValidators: true,
    },
  ).exec()) as ProtectedUser;

  if (role !== UserRole.bakeryOwner) {
    const associatedBakery = await BakeryCollection.findById(bakeryId);
    associatedBakery?.bakers.push({ userId, role });
    await associatedBakery?.save();
  }

  req.user = updatedUser;
};
