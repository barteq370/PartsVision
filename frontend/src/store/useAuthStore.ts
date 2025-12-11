import { create } from "zustand";

// Typ użytkownika zwracanego przez backend
interface User {
    id: number;
    email: string;
    role: string;
}

// Typ całego store
interface AuthState {
    token: string | null;
    user: User | null;

    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    fetchMe: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: localStorage.getItem("token") || null,
    user: null,

    // ------------------------------------------------
    // LOGIN
    // ------------------------------------------------
    login: async (email: string, password: string) => {
        try {
            const res = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) return false;

            const data = await res.json();

            // zapis tokena w localStorage
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

    // ------------------------------------------------
    // REGISTER
    // ------------------------------------------------
    register: async (email: string, password: string) => {
        try {
            const res = await fetch("http://localhost:4000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) return false;

            // auto-logowanie
            const success = await get().login(email, password);
            return success;
        } catch {
            return false;
        }
    },

    // ------------------------------------------------
    // LOGOUT
    // ------------------------------------------------
    logout: () => {
        localStorage.removeItem("token");

        set({
            token: null,
            user: null
        });
    },

    // ------------------------------------------------
    // FETCH CURRENT USER (po odświeżeniu lub wejściu na panel)
    // ------------------------------------------------
    fetchMe: async () => {
        const token = get().token;
        if (!token) return;

        try {
            const res = await fetch("http://localhost:4000/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                get().logout();
                return;
            }

            // backend zwraca { user: {...} }
            const data = await res.json();
            set({ user: data.user });
        } catch (err) {
            get().logout();
        }
    },

    // ------------------------------------------------
    // INITIALIZE (automatyczne logowanie po refreshu)
    // ------------------------------------------------
    initialize: async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        set({ token });

        await get().fetchMe();
    }
}));
