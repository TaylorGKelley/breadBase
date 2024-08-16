import { ObjectId } from 'mongoose';
import { UserRole } from './User';

type ProtectedUser = {
  _id: ObjectId;
  email: string;
  role: UserRole;
  associatedBakeryId: ObjectId;
};

export default ProtectedUser;
