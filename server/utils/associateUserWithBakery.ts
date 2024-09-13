import { Request } from 'express';
import { ObjectId } from 'mongoose';
import User from '../models/userModel';
import Bakery from '../models/bakeryModel';
import { ProtectedUser, UserRole } from '../types/User';

export const addUserToBakery = async (
  role: UserRole,
  bakeryId: ObjectId,
  req: Request,
  user?: ObjectId,
) => {
  if (!user) user = (req.user as ProtectedUser)._id;

  const userRole = role ? role : UserRole.bakeryView;

  const updatedUser = (await User.findByIdAndUpdate(
    user,
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
    associatedBakery?.bakers.push({ user: updatedUser._id, role });
    await associatedBakery?.save();
  }

  if (user === (req.user as ProtectedUser)._id) req.user = updatedUser;
};

export const removeUserFromBakery = async (
  bakeryId: ObjectId,
  req: Request,
  user?: ObjectId,
) => {
  try {
    if (!user) user = (req.user as ProtectedUser)._id;

    const associatedBakery = await Bakery.findById(bakeryId);
    if (associatedBakery) {
      const userToRemove = associatedBakery?.bakers.filter(
        (baker) => baker.user.toString() !== user?.toString(),
      );
      if (!userToRemove) {
        throw new Error('User not found in bakery');
      }
      associatedBakery.bakers = userToRemove;

      await associatedBakery?.save();

      const updatedUser = (await User.findByIdAndUpdate(
        user,
        {
          associatedBakery: null,
          role: UserRole.defaultUser,
        },
        {
          new: true,
          runValidators: true,
        },
      ).exec()) as ProtectedUser;

      if (user === (req.user as ProtectedUser)._id) req.user = updatedUser;
    } else {
      throw new Error('Bakery not found');
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
