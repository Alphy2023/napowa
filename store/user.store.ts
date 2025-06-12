import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  avatar?: string;
  role: string;
  profile:any;
  permissions: Record<string, string[]>;
}

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-store' }
);
