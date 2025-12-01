import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem("access_token", token);
      try {
        const decodedUser: User = jwtDecode(token);
        set({ accessToken: token, user: decodedUser });
        localStorage.setItem("user", JSON.stringify(decodedUser));
      } catch (error) {
        console.error("Failed to decode token:", error);
        set({ accessToken: token, user: null });
        localStorage.removeItem("user");
      }
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      set({ accessToken: null, user: null });
    }
  },

  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    set({ accessToken: null, user: null });
  },
}));

export default useAuthStore;
