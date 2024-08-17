import { Document, ObjectId } from 'mongoose';
import { UserRole } from './User';

type BakerInvite = Document & {
  bakeryId: ObjectId;
  email: string;
  role: UserRole;
  inviteCode: string;
  date: Date;
  generateInviteCode: generateInviteCode;
  validInviteCode: validInviteCode;
};

type generateInviteCode = () => string;

type validInviteCode = (inviteDate: Date) => boolean;

export default BakerInvite;
