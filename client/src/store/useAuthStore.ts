import { create } from 'zustand';
import User from '@/types/User';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  signInUser: (user: User) => void;
  logoutUser: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  signInUser: (user) => {
    set(() => ({ isAuthenticated: true, user }));
  },
  logoutUser: () => {
    set(() => ({ isAuthenticated: false, user: null }));
  },
}));

export default useAuthStore;
