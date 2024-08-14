import { model, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import BakerySignInDocument from '../types/BakerySignInDocument';

const bakerySignInSchema = new Schema<BakerySignInDocument>({
  bakeryEmail: {
    type: Schema.Types.String,
    unique: true,
    validator: [validator.isEmail, 'Bakery must have a valid email address'],
  },
  bakeryPassword: {
    type: Schema.Types.String,
  },
  bakeryPasswordConfirm: {
    type: Schema.Types.String,
    validate: {
      validator: function (val: string): boolean {
        return val === (this as BakerySignInDocument).bakeryPassword;
      },
    },
  },
  bakeryPasswordChangedAt: Schema.Types.Date,
});

bakerySignInSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number | undefined,
) {
  if (this.bakeryPasswordChangedAt && JWTTimestamp) {
    const changedTimeStamp = parseInt(
      (this.bakeryPasswordChangedAt.getTime() / 1000).toString(),
      10,
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

bakerySignInSchema.methods.correctPassword = async function (
  providedPassword: string,
  authorPassword: string,
): Promise<boolean> {
  return await bcryptjs.compare(providedPassword, authorPassword);
};

bakerySignInSchema.pre<BakerySignInDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (this.bakeryPassword) {
    this.bakeryPassword = await bcryptjs.hash(this.bakeryPassword, 12);

    this.bakeryPasswordConfirm = undefined;
  }

  next();
});

const BakerySignInModel = model<BakerySignInDocument>(
  'BakerySignIn',
  bakerySignInSchema,
);

export default BakerySignInModel;
