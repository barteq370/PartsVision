import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";

export default function WorkshopLayout() {
    const { dark, toggle } = useThemeStore();
    const logout = useAuthStore((s) => s.logout);

    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-main text-main relative">

            <header className="md:hidden w-full bg-card px-4 py-4 flex items-center border-b border-theme fixed top-0 left-0 z-40">

                <button
                    onClick={() => setOpen(!open)}
                    className="text-main text-2xl z-50"
                >
                    ☰
                </button>

                <span className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-main text-lg">
                    PartsVision
                </span>

            </header>


            {open && (
                <div className="absolute top-16 left-0 w-full bg-card border-b border-theme flex flex-col p-4 md:hidden z-50">

                    <Link
                        to="/workshop"
                        className="py-3 hover:text-secondary text-center"
                        onClick={() => setOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/workshop/clients"
                        className="py-3 hover:text-secondary text-center"
                        onClick={() => setOpen(false)}
                    >
                        Klienci
                    </Link>

                    <Link
                        to="/workshop/orders"
                        className="py-3 hover:text-secondary text-center"
                        onClick={() => setOpen(false)}
                    >
                        Zlecenia
                    </Link>

                    <Link
                        to="/workshop/vehicles"
                        className="py-3 hover:text-secondary text-center"
                        onClick={() => setOpen(false)}
                    >
                        Pojazdy
                    </Link>

                    <Link
                        to="/workshop/settings"
                        className="py-3 hover:text-secondary text-center"
                        onClick={() => setOpen(false)}
                    >
                        Ustawienia
                    </Link>

                    <button
                        onClick={() => { toggle() }}
                        className="mt-3 px-4 py-2 rounded-lg border border-theme hover-bg-muted text-center"
                    >
                        {dark ? "Jasny" : "Ciemny"}
                    </button>

                    <button
                        onClick={() => {
                            logout();
                            window.location.href = "/login";
                        }}
                        className="mt-3 px-4 py-2 rounded-lg text-white text-center"
                        style={{ backgroundColor: "var(--danger)" }}
                    >
                        Wyloguj
                    </button>

                </div>
            )}




            <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-theme p-6">
                <div className="mb-6">
                    <div className="text-2xl font-bold">PartsVision</div>
                    <div className="text-sm text-secondary">Panel warsztatu</div>
                </div>

                <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
                    <Link to="/workshop" className="px-3 py-2 rounded hover-bg-muted">Dashboard</Link>
                    <Link to="/workshop/clients" className="px-3 py-2 rounded hover-bg-muted">Klienci</Link>
                    <Link to="/workshop/orders" className="px-3 py-2 rounded hover-bg-muted">Zlecenia</Link>
                    <Link to="/workshop/vehicles" className="px-3 py-2 rounded hover-bg-muted">Pojazdy</Link>
                    <Link to="/workshop/settings" className="px-3 py-2 rounded hover-bg-muted">Ustawienia</Link>
                </nav>

                <button
                    onClick={toggle}
                    className="px-4 py-2 rounded border border-theme hover-bg-muted mb-3"
                >
                    {dark ? "Jasny" : "Ciemny"}
                </button>

                <button
                    onClick={() => {
                        logout();
                        window.location.href = "/login";
                    }}
                    className="px-4 py-2 rounded text-white"
                    style={{ backgroundColor: "var(--danger)" }}
                >
                    Wyloguj
                </button>
            </aside>



            <main className="flex-1 p-6 pt-20 md:pt-6 md:ml-64">
                <Outlet />
            </main>
        </div>
    );
}
