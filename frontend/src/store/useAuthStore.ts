import { create } from "zustand";
import { API_URL } from "../config/api";

interface User {
    id: number;
    email: string;
    role: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isInitialized: boolean;

    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    fetchMe: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: localStorage.getItem("token") || null,
    user: null,
    isInitialized: false,

    login: async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) return false;

            const data = await res.json();

            localStorage.setItem("token", data.token);

            set({
                token: data.token,
                user: data.user
            });

            return true;
        } catch {
            return false;
        }
    },

    register: async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) return false;

            return await get().login(email, password);
        } catch {
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ token: null, user: null });
    },

    fetchMe: async () => {
        const token = get().token;
        if (!token) return;

        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                get().logout();
                return;
            }

            const data = await res.json();
            set({ user: data.user });
        } catch {
            get().logout();
        }
    },

    initialize: async () => {
        const token = localStorage.getItem("token");

        if (token) {
            set({ token });
            await get().fetchMe();
        }

        set({ isInitialized: true });
    }
}));
