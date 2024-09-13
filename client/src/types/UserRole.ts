const userRoles = [
  '*',
  'standard_user',
  'bakery_view',
  'bakery_manage',
  'bakery_admin',
  'bakery_owner',
  'site_admin',
] as const;

type UserRole = (typeof userRoles)[number];

export const BakerRoles = [
  'bakery_view',
  'bakery_manage',
  'bakery_admin',
  'bakery_owner',
] as UserRole[];

export default UserRole;
