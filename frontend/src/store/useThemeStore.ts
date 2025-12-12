import { create } from "zustand";

interface ThemeState {
    dark: boolean;
    toggle: () => void;
    setDark: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    dark: localStorage.getItem("dark") === "false",

    toggle: () =>
        set((state) => {
            const newVal = !state.dark;
            localStorage.setItem("dark", String(newVal));

            document.documentElement.setAttribute("data-theme", newVal ? "dark" : "light");

            return { dark: newVal };
        }),

    setDark: (value: boolean) =>
        set(() => {
            localStorage.setItem("dark", String(value));
            document.documentElement.setAttribute("data-theme", value ? "dark" : "light");
            return { dark: value };
        }),
}));
