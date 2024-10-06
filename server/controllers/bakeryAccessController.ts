import { Request, Response } from 'express';
import BakerInvite from '../models/bakerInviteModel';
import crypto from 'crypto';
import { ProtectedUser, UserRole } from '../types/User';
import {
  addUserToBakery,
  removeUserFromBakery,
} from '../utils/associateUserWithBakery';
import User from '../models/userModel';
import Bakery from '../models/bakeryModel';

export const inviteBaker = async (req: Request, res: Response) => {
  try {
    let { email, role, bakeryId } = req.body;
    // const { associatedBakery: bakeryId } = req.user as ProtectedUser; // ? Removed incase siteAdmin needs to invite someone, front end will manage bakery id

    if (!bakeryId) bakeryId = (req.user as ProtectedUser)?.associatedBakery;

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
      invite: bakerInvite.inviteCode, // ! Temporary
      message: 'Invite sent',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
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

    const inviteRecord = await BakerInvite.findOne({
      inviteCode: hashedInviteCode,
    });

    if (!inviteRecord)
      return res.status(404).send('Invite code does not exist');

    if (!inviteRecord.validInviteCode(inviteRecord.date))
      return res.status(401).send('Invite code is expired');

    // Associate User with bakery
    await addUserToBakery(
      inviteRecord.role,
      inviteRecord.bakeryId,
      req,
      (req.user as ProtectedUser)._id,
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
      error: (error as Error).message,
    });
  }
};

export const leaveBakery = async (req: Request, res: Response) => {
  try {
    const { associatedBakery: bakeryId } = req.user as ProtectedUser;

    if (!bakeryId) {
      return res.status(400).json({
        status: 'fail',
        error: 'User not associated with any bakery',
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
      error: (error as Error).message,
    });
  }
};

export const removeBaker = async (req: Request, res: Response) => {
  try {
    const bakeryId =
      req.body.bakeryId || (req.user as ProtectedUser).associatedBakery;

    const userToRemoveId = req.body.userId;

    if (!bakeryId || !userToRemoveId)
      return new Error(`Please include a ${!bakeryId ? 'userId' : 'bakeryId'}`);

    await removeUserFromBakery(bakeryId, req, userToRemoveId);

    res.status(200).json({
      status: 'success',
      message: 'User removed from bakery',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};

export const transferOwnership = async (req: Request, res: Response) => {
  try {
    const { transferOwnershipToUserId } = req.body;
    const { _id: currentOwnerId, associatedBakery: bakeryId } =
      (req.user as ProtectedUser).role === UserRole.siteAdmin
        ? req.body
        : (req.user as ProtectedUser);

    if (!(await User.findById(transferOwnershipToUserId))) {
      return res.status(404).json({
        status: 'fail',
        error: 'Could not find a user with that Id',
      });
    }

    if (bakeryId) {
      await removeUserFromBakery(bakeryId, req, transferOwnershipToUserId);

      const updatedBakery = await Bakery.findByIdAndUpdate(bakeryId, {
        owner: transferOwnershipToUserId,
      });

      await User.findByIdAndUpdate(transferOwnershipToUserId, {
        associatedBakery: bakeryId,
        role: UserRole.bakeryOwner,
      });

      await addUserToBakery(
        UserRole.bakeryAdmin,
        bakeryId,
        req,
        currentOwnerId,
      );

      res.status(200).json({
        status: 'success',
        message: `Ownership has been successfully transferred to ${req.user}`,
        data: {
          updatedBakery,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        error: 'Please provide a bakery id',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};
