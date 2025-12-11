import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function ClientCreate() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/clients`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name, phone, email })
            });
            if (!res.ok) {
                alert("Nie udało się dodać klienta");
                return;
            }
            navigate("/workshop/clients");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg bg-card p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-main">Dodaj klienta</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1 text-main">Imię i nazwisko</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jan Kowalski" />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Telefon</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="123 456 789" />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Email</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="klient@example.com" />
                </div>

                <button className="w-full px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }} disabled={loading}>
                    {loading ? "Dodawanie..." : "Dodaj klienta"}
                </button>
            </form>
        </div>
    );
}
