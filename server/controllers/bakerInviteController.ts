import { Request, Response } from 'express';
import BakerInvite from '../models/bakerInviteModel';
import crypto from 'crypto';
import { ProtectedUser, UserRole } from '../types/User';
import {
  addUserToBakery,
  removeUserFromBakery,
} from '../utils/associateUserWithBakery';

export const inviteBaker = async (req: Request, res: Response) => {
  try {
    let { email, role, bakeryId } = req.body;
    // const { associatedBakeryId: bakeryId } = req.user as ProtectedUser; // ? Removed incase siteAdmin needs to invite someone, front end will manage bakery id

    if (!bakeryId) bakeryId = (req.user as ProtectedUser)?.associatedBakeryId;

    await BakerInvite.deleteOne({ bakeryId, email });

    const bakerInvite = new BakerInvite({
      bakeryId,
      email,
      role: role as UserRole,
      inviteCode: crypto.randomBytes(32).toString('hex'),
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
    await addUserToBakery(
      (req.user as ProtectedUser)._id,
      inviteRecord.role,
      inviteRecord.bakeryId,
      req,
    );

    // Remove invite
    await inviteRecord.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Invite accepted',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};

export const leaveBakery = async (req: Request, res: Response) => {
  try {
    const { associatedBakeryId: bakeryId } = req.user as ProtectedUser;

    if (!bakeryId) {
      return res.status(400).json({
        status: 'fail',
        message: 'User not associated with any bakery',
      });
    }
    await removeUserFromBakery(bakeryId, req);

    res.status(200).json({
      status: 'success',
      message: 'User removed from bakery',
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};

export const removeBaker = async (req: Request, res: Response) => {
  try {
    const { associatedBakeryId: bakeryId } = req.user as ProtectedUser;
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: (error as Error).message,
    });
  }
};
