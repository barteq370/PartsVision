import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function ClientCreate() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();

    // ------------------------------------------------
    // 1. Funkcja wysyłająca dane klienta do backendu
    // ------------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email
                })
            });

            if (!res.ok) {
                alert("Nie udało się dodać klienta");
                return;
            }

            // po utworzeniu wracamy na listę klientów
            navigate("/workshop/clients");

        } catch (err) {
            console.error("Error creating client:", err);
        } finally {
            setLoading(false);
        }
    };

    // ------------------------------------------------
    // 2. UI formularza
    // ------------------------------------------------
    return (
        <div className="max-w-lg bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Dodaj klienta</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1">Imię i nazwisko</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Jan Kowalski"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Telefon</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="123 456 789"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="klient@example.com"
                    />
                </div>

                <button className="btn-primary w-full" disabled={loading}>
                    {loading ? "Dodawanie..." : "Dodaj klienta"}
                </button>
            </form>
        </div>
    );
}
