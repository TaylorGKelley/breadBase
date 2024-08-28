import { create } from 'zustand';
import User from '@/types/User';

type AuthStore = {
  currentUser?: User | null;
  signInUser: (user: User) => void;
  logoutUser: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  signInUser: (currentUser) => {
    set(() => ({ currentUser }));
  },
  logoutUser: () => {
    set(() => ({ currentUser: null }));
  },
}));

export default useAuthStore;
