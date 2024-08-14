import mongoose from 'mongoose';

type BakerySignInDocument = mongoose.Document & {
  bakeryEmail: string;
  bakeryPassword: string;
  bakeryPasswordConfirm?: string;
  bakeryPasswordChangedAt?: Date;
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

export default BakerySignInDocument;
