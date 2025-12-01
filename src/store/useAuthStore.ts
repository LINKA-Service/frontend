import { create } from "zustand";
import { User } from "../types/user";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem("access_token", token);
      set({ accessToken: token });
      // 토큰 설정 후 사용자 정보 가져오기
      get().fetchUser();
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

  fetchUser: async () => {
    const token = get().accessToken;
    if (!token) return;

    try {
      const response = await fetch("/api/fetchUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const userData = await response.json();
      get().setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
      // 토큰이 유효하지 않으면 로그아웃
      get().logout();
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    set({ accessToken: null, user: null });
  },
}));

export default useAuthStore;
