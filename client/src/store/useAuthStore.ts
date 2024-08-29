import { create } from 'zustand';
import User from '@/types/User';

type AuthStore = {
  user?: User | null;
  previousPathname: string;
  currentPathname: string;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  updateLastUrl: (currentPathname: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  previousPathname: '/',
  currentPathname: '/',
  loginUser: (user) => {
    set(() => ({ user }));
  },
  logoutUser: () => {
    set(() => ({ user: null }));
  },
  updateLastUrl: (currentPathname) => {
    set((state) => ({
      previousPathname: state.currentPathname,
      currentPathname,
    }));
  },
}));

export default useAuthStore;
