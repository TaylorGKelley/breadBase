import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  profilePhoto: string;
  role: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  googleAuth: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  register: async (email, password) => {
    set({ loading: true, error: null });
    // TODO: Implement registration
  },
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const user = await response.json();
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ loading: false, error: (error as Error).message });
    }
  },
  logout: () => {
    fetch(`/api/v1/logout`, {
      method: 'POST',
    }).then(() => {
      set({ user: null, isAuthenticated: false });
    });
  },
  googleAuth: async () => {
    // TODO: Implement Google Auth
  },
  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/checkAuth`);
      if (!response.ok) {
        const user = await response.json();
        set({ user, isAuthenticated: true, loading: false });
      } else {
        set({ user: null, isAuthenticated: false, loading: false });
      }
    } catch (error) {
      set({ loading: false, error: (error as Error).message });
    }
  },
}));

export default useAuthStore;
