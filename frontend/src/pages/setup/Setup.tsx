import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Setup() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
    }, [user]);

    return (
        <div className="max-w-xl mx-auto mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8 text-main">Kim chcesz być w PartsVision?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* do dodania w przyszłości 
                <button onClick={() => navigate("/setup/client")} className="p-6 bg-card shadow rounded-xl hover:shadow-md transition">
                    <h3 className="text-xl font-semibold mb-2 text-main">Klient</h3>
                    <p className="text-secondary text-sm">Zarządzaj swoimi pojazdami i naprawami.</p>
                </button> */}

                <div className="p-6 bg-card shadow rounded-xl hover:shadow-md transition">
                    <h3 className="text-xl font-semibold mb-2 text-main">Klient (Niedostępne)</h3>
                    <p className="text-secondary text-sm">Zarządzaj swoimi pojazdami i naprawami.</p>
                </div>

                <button onClick={() => navigate("/setup/workshop")} className="p-6 bg-card shadow rounded-xl hover:shadow-md transition">
                    <h3 className="text-xl font-semibold mb-2 text-main">Warsztat</h3>
                    <p className="text-secondary text-sm">Zarządzaj klientami, pojazdami i zleceniami.</p>
                </button>

                <div className="p-6 bg-card shadow rounded-xl hover:shadow-md transition">
                    <h3 className="text-xl font-semibold mb-2 text-main">Sklep (Niedostępne)</h3>
                    <p className="text-secondary text-sm">Obsługuj mechaników i zamówienia</p>
                </div>

                {/* do dodania w przyszłości
                <button onClick={() => navigate("/setup/shop")} className="p-6 bg-card shadow rounded-xl hover:shadow-md transition">
                    <h3 className="text-xl font-semibold mb-2 text-main">Sklep</h3>
                    <p className="text-secondary text-sm">Obsługuj mechaników i zamówienia.</p>
                </button> */}
            </div>
        </div>
    );
}
