enum UserRole {
  defaultUser = 'standard_user',
  bakeryView = 'bakery_view',
  bakeryManage = 'bakery_manage',
  bakeryAdmin = 'bakery_admin',
  bakeryOwner = 'bakery_owner',
  siteAdmin = 'site_admin',
}

type User = {
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  associatedBakery?: string;
  profilePhoto?: string;
  accountActive: boolean;
};

export default User;
