import { create } from "zustand";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  syncRole: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),

  syncRole: () => {
    set((state) => {
      if (!state.user) return state;
      // Simulate role synchronization logic
      console.log("Syncing role for user:", state.user.name);
      return { ...state };
    });
  },
}));
