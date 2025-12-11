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

    // -------------------------
    // Pobieranie pojazdu
    // -------------------------
    const fetchVehicle = async () => {
        try {
            const res = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                navigate("/workshop");
                return;
            }

            const data = await res.json();
            setVehicle(data);

        } catch (err) {
            console.error("Error loading vehicle:", err);
        }
    };

    // -------------------------
    // Usuwanie pojazdu
    // -------------------------
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz usunąć ten pojazd? Tej operacji nie można cofnąć."
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                alert("Nie udało się usunąć pojazdu.");
                return;
            }

            navigate(`/workshop/clients/${vehicle.clientId}`);

        } catch (err) {
            console.error("Error deleting vehicle:", err);
            alert("Wystąpił błąd podczas usuwania pojazdu.");
        }
    };

    // -------------------------
    // Tworzenie nowego zlecenia
    // -------------------------
    const handleCreateOrder = async () => {
        if (!desc.trim()) {
            alert("Opis wymagany");
            return;
        }

        setOrdersLoading(true);

        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehicleId: Number(vehicleId),
                    description: desc
                })
            });

            if (!res.ok) {
                alert("Nie udało się utworzyć zlecenia");
                return;
            }

            const data = await res.json();
            setDesc("");
            setCreating(false);

            await fetchVehicle();

            navigate(`/ workshop / orders / ${data.id}`);

        } catch (err) {
            console.error(err);
            alert("Błąd serwera");
        } finally {
            setOrdersLoading(false);
        }
    };

    // -------------------------
    // Ładowanie danych
    // -------------------------
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

    // --------------------------------------------------
    // UI
    // --------------------------------------------------
    return (
        <div>
            <Link
                to={`/ workshop / clients / ${vehicle.clientId}`}
                className="text-sm hover:text-blue-600"
            >
                &larr; Powrót do klienta
            </Link>

            <h1 className="text-2xl font-semibold mt-4 mb-6">
                Szczegóły pojazdu
            </h1>

            {/* INFORMACJE O POJEŹDZIE */}
            <div className="bg-white p-6 rounded shadow mb-10">
                <div className="text-xl font-medium mb-2">
                    {vehicle.brand} {vehicle.model} ({vehicle.year})
                </div>

                <div className="text-gray-700 mb-1">
                    VIN: <span className="font-mono">{vehicle.vin}</span>
                </div>

                <div className="text-gray-700 mb-4">
                    Właściciel:{" "}
                    <Link
                        to={`/workshop/clients/${vehicle.clientId}`}
                        className="font-medium text-blue-600"
                    >
                        {vehicle.client.name}
                    </Link>
                </div>

                <div className="flex gap-4">
                    <Link
                        to={`/workshop/vehicles/${vehicle.id}/edit`}
                        className="btn-primary"
                    >
                        Edytuj
                    </Link>

                    <button
                        className="btn-secondary text-red-700"
                        onClick={handleDelete}
                    >
                        Usuń pojazd
                    </button>
                </div>
            </div>

            {/* NOWE ZLECENIE */}
            <h2 className="text-xl font-semibold mb-4">Nowe zlecenie</h2>

            {!creating ? (
                <button className="btn-primary mb-6" onClick={() => setCreating(true)}>
                    Utwórz zlecenie
                </button>
            ) : (
                <div className="bg-white p-4 rounded shadow mb-6">
                    <textarea
                        className="w-full p-3 border rounded mb-3"
                        placeholder="Opis prac..."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />

                    <div className="flex gap-3">
                        <button
                            className="btn-primary"
                            onClick={handleCreateOrder}
                            disabled={ordersLoading}
                        >
                            {ordersLoading ? "Tworzenie..." : "Utwórz"}
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={() => setCreating(false)}
                        >
                            Anuluj
                        </button>
                    </div>
                </div>
            )}

            {/* ZLECENIA POJAZDU */}
            <h2 className="text-xl font-semibold mb-4">Zlecenia pojazdu</h2>

            {vehicle.orders.length === 0 ? (
                <div className="text-gray-500">Brak zleceń dla tego pojazdu.</div>
            ) : (
                <div className="space-y-4">
                    {vehicle.orders.map((order: any) => (
                        <div
                            key={order.id}
                            className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium">Zlecenie #{order.id}</div>
                                <div className="text-sm text-gray-600">
                                    Status: {order.status}
                                </div>
                            </div>

                            <Link
                                to={`/workshop/orders/${order.id}`}
                                className="text-sm hover:text-blue-600"
                            >
                                Szczegóły
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
