import { Request } from 'express';
import { ObjectId } from 'mongoose';
import User from '../models/userModel';
import Bakery from '../models/bakeryModel';
import { ProtectedUser, UserRole } from '../types/User';

export const addUserToBakery = async (
  userId: ObjectId,
  role: UserRole,
  bakeryId: ObjectId,
  req: Request,
) => {
  const userRole = role ? role : UserRole.bakeryView;

  const updatedUser = (await User.findByIdAndUpdate(
    userId,
    {
      associatedBakery: bakeryId,
      role: userRole,
    },
    {
      new: true,
      runValidators: true,
    },
  ).exec()) as ProtectedUser;

  if (role !== UserRole.bakeryOwner) {
    const associatedBakery = await Bakery.findById(bakeryId);
    associatedBakery?.bakers.push({ userId, role });
    await associatedBakery?.save();
  }

  req.user = updatedUser;
};

export const removeUserFromBakery = async (
  bakeryId: ObjectId,
  req: Request,
  userId?: ObjectId,
) => {
  try {
    if (!userId) userId = (req.user as ProtectedUser)._id;

    const updatedUser = (await User.findByIdAndUpdate(
      userId,
      {
        associatedBakery: undefined,
        role: UserRole.defaultUser,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec()) as ProtectedUser;

    const associatedBakery = await Bakery.findById(bakeryId);
    const userIndex = associatedBakery?.bakers.findIndex(
      (user) => user.userId === userId,
    );
    if (userIndex === -1 || userIndex === undefined) {
      throw new Error('User not found in bakery');
    }
    associatedBakery?.bakers.splice(userIndex, 1);
    await associatedBakery?.save();

    req.user = updatedUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
