import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function VehicleCreate() {
    const { clientId } = useParams();
    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();

    const [vin, setVin] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

    const [loading, setLoading] = useState(false);

    // ----------------------------------------------------
    // 1. Dodawanie pojazdu
    // ----------------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/vehicles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    vin,
                    brand,
                    model,
                    year,
                    clientId: Number(clientId)
                })
            });

            if (!res.ok) {
                alert("Nie udało się dodać pojazdu.");
                return;
            }

            // po sukcesie wracamy do szczegółów klienta
            navigate(`/workshop/clients/${clientId}`);

        } catch (err) {
            console.error("Error creating vehicle:", err);
        } finally {
            setLoading(false);
        }
    };

    // ----------------------------------------------------
    // 2. UI formularza
    // ----------------------------------------------------
    return (
        <div className="max-w-lg bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Dodaj pojazd</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

                <div>
                    <label className="block text-sm mb-1">VIN</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        placeholder="WBA3A..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Marka</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="BMW"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Model</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="320i"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Rok</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2014"
                        required
                    />
                </div>

                <button className="btn-primary w-full" disabled={loading}>
                    {loading ? "Dodawanie..." : "Dodaj pojazd"}
                </button>
            </form>
        </div>
    );
}
