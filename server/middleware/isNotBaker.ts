import { UserRole } from '../types/User';

const isNotBaker = (req: any, res: any, next: any) => {
  if (
    req.user?.role === UserRole.defaultUser ||
    !req.user?.associatedBakery
  ) {
    next();
  } else {
    res.status(401).json({
      error: 'This account is already part of a bakery',
    });
  }
};

export default isNotBaker;
