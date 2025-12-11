import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function WorkshopClients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = useAuthStore((s) => s.token);

    // ------------------------------------------------
    // 1. Funkcja pobierająca klientów z backendu
    // ------------------------------------------------
    const fetchClients = async () => {
        try {
            const res = await fetch(`${API_URL}/clients`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                console.error("Failed to fetch clients");
                return;
            }

            const data = await res.json();
            setClients(data);
        } catch (err) {
            console.error("Error fetching clients:", err);
        } finally {
            setLoading(false);
        }
    };

    // ------------------------------------------------
    // 2. Fetch na wejściu do komponentu
    // ------------------------------------------------
    useEffect(() => {
        fetchClients();
    }, []);

    // ------------------------------------------------
    // 3. Loading state
    // ------------------------------------------------
    if (loading) return <div>Ładowanie klientów...</div>;

    // ------------------------------------------------
    // 4. Wyświetlanie listy klientów
    // ------------------------------------------------
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Klienci</h2>
                <Link to="/workshop/clients/new" className="btn-primary">
                    Dodaj klienta
                </Link>

            </div>

            {clients.length === 0 ? (
                <div className="text-gray-500">Brak klientów</div>
            ) : (
                <div className="space-y-4">
                    {clients.map((client: any) => (
                        <div
                            key={client.id}
                            className="p-4 bg-white rounded shadow flex items-center justify-between"
                        >
                            <div>
                                <div className="font-medium">{client.name}</div>
                                <div className="text-sm text-gray-600">{client.email}</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    to={`/workshop/clients/${client.id}`}
                                    className="text-sm hover:text-blue-600"
                                >
                                    Szczegóły
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
