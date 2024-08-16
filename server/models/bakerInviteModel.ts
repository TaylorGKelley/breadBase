import { model, Schema } from 'mongoose';
import crypto from 'crypto';
import BakerInvite from '../types/BakerInvite';
import { UserRole } from '../types/User';

const bakerInviteSchema = new Schema<BakerInvite>({
  bakeryId: {
    type: Schema.Types.ObjectId,
    ref: 'Bakery',
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.String,
    enum: UserRole,
  },
  inviteCode: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

bakerInviteSchema.methods.validInviteCode = function (
  inviteCode: string,
  hashedCode: string,
  inviteDate: Date,
) {
  const hashedInviteCode = crypto
    .createHash('sha256')
    .update(inviteCode)
    .digest('hex');

  return (
    hashedInviteCode === hashedCode &&
    inviteDate.getTime() + 2 * 24 * 60 * 60 * 1000 < Date.now()
  );
};

bakerInviteSchema.pre<BakerInvite>('save', function (next) {
  const hashedInviteCode = crypto
    .createHash('sha256')
    .update(this.inviteCode)
    .digest('hex');

  this.inviteCode = hashedInviteCode;

  next();
});

const BakerInviteModel = model<BakerInvite>('BakerInvite', bakerInviteSchema);

export default BakerInviteModel;