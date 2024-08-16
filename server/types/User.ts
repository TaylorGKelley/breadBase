import { Document, ObjectId } from 'mongoose';

export enum UserRole {
  defaultUser = 'standard_user',
  bakeryView = 'bakery_view',
  bakeryManage = 'bakery_manage',
  bakeryAdmin = 'bakery_admin',
  bakeryOwner = 'bakery_owner',
}

type User = Document & {
  googleId?: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  role: UserRole;
  associatedBakery?: ObjectId; // https://mongoosejs.com/docs/typescript/populate.html
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  profilePhoto?: string;
  createdAt: Date;
  lastLogin: Date;
  accountActive: boolean;
  correctPassword: correctPassword;
  changedPasswordAfter: changedPasswordAfter;
  createPasswordResetToken: createPasswordResetToken;
};

export type correctPassword = (
  providedPassword: string,
  authorPassword: string,
) => Promise<boolean>;

export type changedPasswordAfter = (
  JWTTimestamp: number | undefined,
) => boolean;

export type createPasswordResetToken = () => string;

export default User;
