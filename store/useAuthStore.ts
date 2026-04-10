import { persist } from "zustand/middleware";
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  login: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "scas",
    },
  ),
);
