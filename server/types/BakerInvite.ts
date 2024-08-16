import { Document, ObjectId } from 'mongoose';
import { UserRole } from './User';

type BakerInvite = Document & {
  bakeryId: ObjectId;
  email: string;
  type: UserRole;
  inviteCode: string;
  date: Date;
  generateInviteCode: () => string;
};

export default BakerInvite;
