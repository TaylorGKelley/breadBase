import mongoose from 'mongoose';

export enum UserRole {
  userStandard = 'user_standard',
  bakeryView = 'bakery_view',
  bakeryManage = 'bakery_manage',
  bakeryOwner = 'bakery_owner',
}

type User = mongoose.Document & {
  googleId?: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  role: UserRole;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  profilePhoto?: string;
  createdAt: Date;
  lastLogin: Date;
  accountActive: boolean;
  correctPassword: correctPassword;
  changedPasswordAfter: changedPasswordAfter;
};

export type correctPassword = (
  providedPassword: string,
  authorPassword: string,
) => Promise<boolean>;

export type changedPasswordAfter = (
  JWTTimestamp: number | undefined,
) => boolean;

export default User;
