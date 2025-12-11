import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (!success) {
            setError("Niepoprawny email lub hasło");
            return;
        }
        navigate("/workshop");
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-card p-8 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-6 text-main">Logowanie</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1 text-main">Email</label>
                    <input
                        className="w-full p-3 border rounded bg-card text-main"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Hasło</label>
                    <input
                        type="password"
                        className="w-full p-3 border rounded bg-card text-main"
                        placeholder="hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-danger text-sm">{error}</p>}

                <button className="w-full px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>
                    Zaloguj
                </button>
            </form>

            <div className="mt-4 text-sm text-secondary text-center">
                Nie masz konta? <Link to="/register" className="text-accent">Zarejestruj się</Link>
            </div>
        </div>
    );
}
