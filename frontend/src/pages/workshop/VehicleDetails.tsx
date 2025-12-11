import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function VehicleDetails() {
    const { vehicleId } = useParams();
    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [desc, setDesc] = useState("");
    const [ordersLoading, setOrdersLoading] = useState(false);

    const fetchVehicle = async () => {
        try {
            const res = await fetch(`${API_URL}/vehicles/${vehicleId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) {
                navigate("/workshop");
                return;
            }
            const data = await res.json();
            setVehicle(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten pojazd? Tej operacji nie można cofnąć.");
        if (!confirmDelete) return;
        try {
            const res = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) {
                alert("Nie udało się usunąć pojazdu.");
                return;
            }
            navigate(`/workshop/clients/${vehicle.clientId}`);
        } catch (err) {
            console.error(err);
            alert("Wystąpił błąd podczas usuwania pojazdu.");
        }
    };

    const handleCreateOrder = async () => {
        if (!desc.trim()) {
            alert("Opis wymagany");
            return;
        }
        setOrdersLoading(true);
        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ vehicleId: Number(vehicleId), description: desc })
            });
            if (!res.ok) {
                alert("Nie udało się utworzyć zlecenia");
                return;
            }
            const data = await res.json();
            setDesc("");
            setCreating(false);
            await fetchVehicle();
            navigate(`/workshop/orders/${data.id}`);
        } catch (err) {
            console.error(err);
            alert("Błąd serwera");
        } finally {
            setOrdersLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await fetchVehicle();
            setLoading(false);
        };
        load();
    }, [vehicleId]);

    if (loading) return <div>Ładowanie pojazdu...</div>;
    if (!vehicle) return <div>Nie udało się załadować pojazdu.</div>;

    return (
        <div>
            <Link to={`/workshop/clients/${vehicle.clientId}`} className="text-sm text-accent">&larr; Powrót do klienta</Link>

            <h1 className="text-2xl font-semibold mt-4 mb-6 text-main">Szczegóły pojazdu</h1>

            <div className="bg-card p-6 rounded shadow mb-10">
                <div className="text-xl font-medium mb-2 text-main">{vehicle.brand} {vehicle.model} ({vehicle.year})</div>
                <div className="text-secondary mb-1">VIN: <span className="font-mono">{vehicle.vin}</span></div>
                <div className="text-secondary mb-4">Właściciel: <Link to={`/workshop/clients/${vehicle.clientId}`} className="font-medium text-accent">{vehicle.client.name}</Link></div>

                <div className="flex gap-4">
                    <Link to={`/workshop/vehicles/${vehicle.id}/edit`} className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>Edytuj</Link>
                    <button className="px-4 py-2 rounded-lg border border-theme bg-card text-main" onClick={handleDelete}>Usuń pojazd</button>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-main">Nowe zlecenie</h2>

            {!creating ? (
                <button className="px-4 py-2 rounded-lg text-white mb-6" style={{ backgroundColor: "var(--accent)" }} onClick={() => setCreating(true)}>Utwórz zlecenie</button>
            ) : (
                <div className="bg-card p-4 rounded shadow mb-6">
                    <textarea className="w-full p-3 border rounded mb-3 bg-card text-main" placeholder="Opis prac..." value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }} onClick={handleCreateOrder} disabled={ordersLoading}>{ordersLoading ? "Tworzenie..." : "Utwórz"}</button>
                        <button className="px-4 py-2 rounded-lg border border-theme bg-card text-main" onClick={() => setCreating(false)}>Anuluj</button>
                    </div>
                </div>
            )}

            <h2 className="text-xl font-semibold mb-4 text-main">Zlecenia pojazdu</h2>

            {vehicle.orders.length === 0 ? (
                <div className="text-secondary">Brak zleceń dla tego pojazdu.</div>
            ) : (
                <div className="space-y-4">
                    {vehicle.orders.map((order: any) => (
                        <div key={order.id} className="p-4 bg-card rounded shadow flex justify-between items-center">
                            <div>
                                <div className="font-medium text-main">Zlecenie #{order.id}</div>
                                <div className="text-sm text-secondary">Status: {order.status}</div>
                            </div>

                            <Link to={`/workshop/orders/${order.id}`} className="text-sm text-accent">Szczegóły</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
