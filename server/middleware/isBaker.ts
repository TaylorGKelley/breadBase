import { UserRole } from '../types/User';

const isBaker = (req: any, res: any, next: any) => {
  if (
    req.user?.role === UserRole.defaultUser ||
    !req.user?.associatedBakeryId
  ) {
    next();
  } else {
    res.status(401).json({
      message: 'This account is already part of a bakery',
    });
  }
};

export default isBaker;
