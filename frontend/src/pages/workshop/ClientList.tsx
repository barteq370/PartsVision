import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function ClientList() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((s) => s.token);

    const fetchClients = async () => {
        try {
            const res = await fetch(`${API_URL}/clients`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            setClients(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    if (loading) return <div>Ładowanie klientów...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-main">Klienci</h2>
                <Link to="/workshop/clients/new" className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>Dodaj klienta</Link>
            </div>

            {clients.length === 0 ? (
                <div className="text-secondary">Brak klientów</div>
            ) : (
                <div className="space-y-4">
                    {clients.map((client) => (
                        <div key={client.id} className="p-4 bg-card rounded shadow flex items-center justify-between">
                            <div>
                                <div className="font-medium text-main">{client.name}</div>
                                <div className="text-sm text-secondary">{client.email}</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link to={`/workshop/clients/${client.id}`} className="text-sm text-accent">Szczegóły</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
