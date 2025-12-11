import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function WorkshopSetup() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Nazwa warsztatu jest wymagana.");
            return;
        }
        const res = await fetch(`${API_URL}/workshops/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ name })
        });
        if (!res.ok) {
            setError("Nie udało się utworzyć warsztatu.");
            return;
        }
        await useAuthStore.getState().fetchMe();
        navigate("/workshop");
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-card p-8 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-6 text-main">Konfiguracja warsztatu</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1 text-main">Nazwa warsztatu</label>
                    <input className="w-full p-3 border rounded bg-card text-main" placeholder="np. AutoFix Serwis" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                {error && <p className="text-danger text-sm">{error}</p>}

                <button className="w-full px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>
                    Zapisz i przejdź dalej
                </button>
            </form>
        </div>
    );
}
