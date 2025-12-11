import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function ClientEdit() {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const token = useAuthStore((s) => s.token);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchClient = async () => {
        try {
            const res = await fetch(`${API_URL}/clients/${clientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) {
                navigate("/workshop/clients");
                return;
            }
            const data = await res.json();
            setName(data.name);
            setPhone(data.phone);
            setEmail(data.email);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClient();
    }, [clientId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/clients/${clientId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ name, phone, email })
        });
        if (res.ok) {
            navigate(`/workshop/clients/${clientId}`);
        } else {
            alert("Nie udało się zaktualizować klienta.");
        }
    };

    if (loading) return <div>Ładowanie...</div>;

    return (
        <div className="max-w-lg bg-card p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-main">Edytuj klienta</h2>

            <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                    <label className="block text-sm mb-1 text-main">Imię i nazwisko</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Telefon</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Email</label>
                    <input className="w-full p-3 border rounded bg-card text-main" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button className="w-full px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>Zapisz zmiany</button>
            </form>
        </div>
    );
}
