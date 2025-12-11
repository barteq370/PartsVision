import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

export default function Setup() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        // Jeśli user nie jest zalogowany → redirect do login
        if (!user) {
            navigate("/login");
            return;
        }

        // Jeśli ma już ustawioną rolę w przyszłości → redirect do panelu
        // if (user.role !== "USER") {
        //     navigate("/dashboard"); // na razie nie używamy
        // }
    }, [user]);

    return (
        <div className="max-w-xl mx-auto mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8">
                Kim chcesz być w PartsVision?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate("/setup/client")}
                    className="p-6 bg-white shadow rounded-xl hover:shadow-md transition"
                >
                    <h3 className="text-xl font-semibold mb-2">Klient</h3>
                    <p className="text-gray-500 text-sm">
                        Zarządzaj swoimi pojazdami i naprawami.
                    </p>
                </button>

                <button
                    onClick={() => navigate("/setup/workshop")}
                    className="p-6 bg-white shadow rounded-xl hover:shadow-md transition"
                >
                    <h3 className="text-xl font-semibold mb-2">Warsztat</h3>
                    <p className="text-gray-500 text-sm">
                        Zarządzaj klientami, pojazdami i zleceniami.
                    </p>
                </button>

                <button
                    onClick={() => navigate("/setup/shop")}
                    className="p-6 bg-white shadow rounded-xl hover:shadow-md transition"
                >
                    <h3 className="text-xl font-semibold mb-2">Sklep</h3>
                    <p className="text-gray-500 text-sm">
                        Obsługuj mechaników i zamówienia.
                    </p>
                </button>
            </div>
        </div>
    );
}
