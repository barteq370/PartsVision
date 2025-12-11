import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

export default function WorkshopLayout() {
    const dark = useThemeStore((s) => s.dark);
    const setDark = useThemeStore((s) => s.setDark);

    return (
        <div className="min-h-screen flex bg-main text-main transition-colors">
            <aside className="w-64 bg-card border-r border-theme p-6 hidden md:flex flex-col h-screen transition-colors">
                <div className="mb-6">
                    <div className="text-2xl font-bold text-main">PartsVision</div>
                    <div className="text-sm text-secondary">Panel warsztatu</div>
                </div>

                <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
                    <Link to="/workshop" className="px-3 py-2 rounded-lg hover-bg-muted transition">Dashboard</Link>
                    <Link to="/workshop/clients" className="px-3 py-2 rounded-lg hover-bg-muted transition">Klienci</Link>
                    <Link to="/workshop/orders" className="px-3 py-2 rounded-lg hover-bg-muted transition">Zlecenia</Link>
                    <Link to="/workshop/vehicles" className="px-3 py-2 rounded-lg hover-bg-muted transition">Pojazdy</Link>
                    <Link to="/workshop/settings" className="px-3 py-2 rounded-lg hover-bg-muted transition">Ustawienia</Link>
                </nav>

                <div className="mt-4 flex flex-col gap-3">
                    <button
                        className="w-full px-4 py-2 rounded-lg border border-theme text-main bg-card hover-bg-muted transition"
                        onClick={() => setDark(!dark)}
                    >
                        {dark ? "Jasny motyw" : "Ciemny motyw"}
                    </button>

                    <button
                        className="w-full px-4 py-2 rounded-lg"
                        style={{ backgroundColor: "var(--danger)", color: "white" }}
                        onClick={() => {
                            useAuthStore.getState().logout();
                            window.location.href = "/login";
                        }}
                    >
                        Wyloguj
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
