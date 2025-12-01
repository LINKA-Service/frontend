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
    console.log("=== setAccessToken ===");
    console.log("token:", token ? token.substring(0, 20) + "..." : "null");

    if (token) {
      localStorage.setItem("access_token", token);
      set({ accessToken: token });
      console.log("Calling fetchUser...");
      get().fetchUser();
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      set({ accessToken: null, user: null });
    }
  },

  setUser: (user) => {
    console.log("=== setUser ===");
    console.log("user:", user);
    set({ user });
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  },

  fetchUser: async () => {
    const token = get().accessToken;
    console.log("=== fetchUser (store) ===");
    console.log("token exists:", !!token);

    if (!token) {
      console.log("No token, skipping fetch");
      return;
    }

    try {
      console.log("Fetching /api/fetchUser...");
      const response = await fetch("/api/fetchUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!response.ok) {
        console.error("Response not ok:", response.status);
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const userData = JSON.parse(responseText);
      console.log("User data:", userData);
      get().setUser(userData);
    } catch (error) {
      console.error("=== fetchUser ERROR (store) ===");
      console.error("Error:", error);
      get().logout();
    }
  },

  logout: () => {
    console.log("=== logout ===");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    set({ accessToken: null, user: null });
  },
}));

export default useAuthStore;
