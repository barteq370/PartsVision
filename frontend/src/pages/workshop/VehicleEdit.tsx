import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function VehicleEdit() {
    const { vehicleId } = useParams();
    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();

    const [vin, setVin] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ---------------------------------------
    // 1. Pobranie pojazdu do edycji
    // ---------------------------------------
    const loadVehicle = async () => {
        try {
            const res = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                navigate("/workshop");
                return;
            }

            const data = await res.json();

            setVin(data.vin);
            setBrand(data.brand);
            setModel(data.model);
            setYear(data.year);

        } catch (err) {
            console.error("Error loading vehicle:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVehicle();
    }, [vehicleId]);

    // ---------------------------------------
    // 2. Zapis zmian pojazdu
    // ---------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    vin,
                    brand,
                    model,
                    year
                })
            });

            if (!res.ok) {
                alert("Nie udało się zapisać zmian.");
                return;
            }

            navigate(`/workshop/vehicles/${vehicleId}`);

        } catch (err) {
            console.error("Error updating vehicle:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Ładowanie pojazdu...</div>;

    return (
        <div className="max-w-lg bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Edytuj pojazd</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1">VIN</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Marka</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Model</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Rok</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>

                <button className="btn-primary w-full" disabled={saving}>
                    {saving ? "Zapisywanie..." : "Zapisz zmiany"}
                </button>
            </form>
        </div>
    );
}
