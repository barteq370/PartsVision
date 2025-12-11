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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/vehicles`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ vin, brand, model, year, clientId: Number(clientId) })
            });
            if (!res.ok) {
                alert("Nie udało się dodać pojazdu.");
                return;
            }
            navigate(`/workshop/clients/${clientId}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg bg-card p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-main">Dodaj pojazd</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1 text-main">VIN</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={vin} onChange={(e) => setVin(e.target.value)} placeholder="WBA3A..." required />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Marka</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="BMW" required />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Model</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={model} onChange={(e) => setModel(e.target.value)} placeholder="320i" required />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Rok</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2014" required />
                </div>

                <button className="w-full px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }} disabled={loading}>
                    {loading ? "Dodawanie..." : "Dodaj pojazd"}
                </button>
            </form>
        </div>
    );
}
