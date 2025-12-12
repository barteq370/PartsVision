import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function OrderCreate() {
    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const vehicleId = params.get("vehicleId");

    const [description, setDescription] = useState("");
    const [fieldError, setFieldError] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!vehicleId || isNaN(Number(vehicleId))) {
            navigate("/workshop/vehicles");
        }
    }, [vehicleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldError("");
        setGlobalError("");

        if (!description.trim()) {
            setFieldError("Opis jest wymagany.");
            return;
        }

        if (description.trim().length < 3) {
            setFieldError("Opis musi mieć co najmniej 3 znaki.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehicleId: Number(vehicleId),
                    description: description.trim()
                })
            });

            if (!res.ok) {
                setGlobalError("Nie udało się utworzyć zlecenia.");
                return;
            }

            const data = await res.json();
            navigate(`/workshop/orders/${data.id}`);
        } catch {
            setGlobalError("Błąd serwera");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg bg-card p-6 rounded shadow">
            <h1 className="text-2xl font-semibold mb-6 text-main">Nowe zlecenie</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1 text-main">Opis zlecenia</label>
                    <textarea
                        className="w-full p-3 border rounded bg-card text-main"
                        placeholder="Np. wymiana oleju, diagnostyka..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                    {fieldError && <p className="text-danger text-sm mt-1">{fieldError}</p>}
                </div>

                {globalError && <p className="text-danger text-sm">{globalError}</p>}

                <button
                    className="w-full px-6 py-3 rounded-lg text-white"
                    style={{ backgroundColor: "var(--accent)" }}
                    disabled={loading}
                >
                    {loading ? "Tworzenie..." : "Utwórz zlecenie"}
                </button>
            </form>
        </div>
    );
}
