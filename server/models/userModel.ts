import { model, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import validator from 'validator';
import User, { UserRole } from '../types/User';

const userSchema = new Schema<User>({
  googleId: {
    type: Schema.Types.String,
    unique: true,
    sparse: true,
  },
  firstName: {
    type: Schema.Types.String,
  },
  lastName: {
    type: Schema.Types.String,
  },
  displayName: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: [true, 'User must have an email associated with the account'],
    validator: [validator.isEmail, 'Invalid email address'],
  },
  isBakerySignUp: Schema.Types.Boolean,
  role: {
    type: Schema.Types.String,
    enum: UserRole,
    default: UserRole.defaultUser,
  },
  associatedBakery: {
    type: Schema.Types.ObjectId,
    ref: 'Bakery',
  },
  password: {
    type: Schema.Types.String,
    minlength: 8,
  },
  passwordConfirm: {
    type: Schema.Types.String,
    validate: {
      validator: function (val: string): boolean {
        return val === (this as User).password;
      },
    },
  },
  passwordChangedAt: Schema.Types.Date,
  passwordResetToken: Schema.Types.String,
  passwordResetTokenExpires: Schema.Types.Date,
  profilePhoto: {
    type: Schema.Types.String,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: new Date(Date.now()),
  },
  lastLogin: {
    type: Schema.Types.Date,
    default: new Date(Date.now()),
  },
  accountActive: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

userSchema.methods.changedPasswordAfter = function (
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

userSchema.methods.correctPassword = async function (
  providedPassword: string,
  authorPassword: string,
): Promise<boolean> {
  return await bcryptjs.compare(providedPassword, authorPassword);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Temporary, until Emails are working
  console.log({ resetToken });

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre<User>('validate', function (next) {
  if (this.googleId === undefined && this.password === undefined)
    return next(new Error('User needs a password'));

  next();
});

userSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (this.password) {
    this.password = await bcryptjs.hash(this.password, 12);

    this.passwordConfirm = undefined;
  }

  next();
});

userSchema.pre<User>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000); // keeps it 1 second in the past so there are no bugs with the json web token being before the password was changed.
  next();
});

// Type Error: this.where is not a function
// userSchema.pre<Query<User[], User>>(/.*/, async function (next) {
//   this.where({ accountActive: true });
//   next();
// });

const UserModel = model<User>('User', userSchema);

export default UserModel;
