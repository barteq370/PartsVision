import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function VehiclesList() {
    const token = useAuthStore((s) => s.token);
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const fetchVehicles = async () => {
        try {
            const res = await fetch(`${API_URL}/vehicles/workshop?q=${encodeURIComponent(query)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            setVehicles(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchVehicles();
        }, 300);
        return () => clearTimeout(handler);
    }, [query]);

    if (loading) return <div>Ładowanie pojazdów...</div>;

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6 text-main">Pojazdy</h1>

            <div className="mb-4">
                <input
                    type="text"
                    className="p-2 w-full border rounded bg-card text-main"
                    placeholder="Szukaj po VIN, marce lub modelu..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {vehicles.length === 0 ? (
                <div className="text-secondary">Brak pojazdów</div>
            ) : (
                <div className="space-y-4">
                    {vehicles.map((v) => (
                        <div key={v.id} className="p-4 bg-card rounded shadow flex justify-between items-center">
                            <div>
                                <div className="font-medium text-main">{v.brand} {v.model} ({v.year})</div>
                                <div className="text-sm text-secondary">VIN: {v.vin}</div>
                                <div className="text-sm text-secondary">Właściciel: {v.client?.name}</div>
                            </div>

                            <Link to={`/workshop/vehicles/${v.id}`} className="text-sm text-accent">Szczegóły</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
