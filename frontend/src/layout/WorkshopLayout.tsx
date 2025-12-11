import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function WorkshopLayout() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col h-screen">
                <div className="mb-6">
                    <div className="text-2xl font-bold">PartsVision</div>
                    <div className="text-sm text-gray-500">Panel warsztatu</div>
                </div>

                <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
                    <Link to="/workshop" className="text-sm hover:text-blue-600">Dashboard</Link>
                    <Link to="/workshop/clients" className="text-sm hover:text-blue-600">Klienci</Link>
                    <Link to="/workshop/orders" className="text-sm hover:text-blue-600">Zlecenia</Link>
                    <Link to="/workshop/settings" className="text-sm hover:text-blue-600">Ustawienia</Link>
                </nav>

                <div className="mt-4">
                    <button
                        className="btn-secondary w-full"
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
