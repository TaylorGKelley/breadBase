import Bakery from './Bakery';
import UserRole from './UserRole';

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  role: UserRole;
  lastLogin: Date;
  profilePhoto: string;
  associatedBakery: string | Bakery;
};

export default User;
