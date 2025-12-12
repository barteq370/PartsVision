import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { validateEmail, validatePassword, validateConfirmPassword } from "../../../utils/validators";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});

    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const eEmail = validateEmail(email);
        const ePass = validatePassword(password);
        const eConfirm = validateConfirmPassword(password, confirmPassword);
        setFieldErrors({ email: eEmail, password: ePass, confirm: eConfirm });
        if (eEmail || ePass || eConfirm) return;
        const success = await register(email, password);
        if (!success) {
            setError("Rejestracja nieudana. Email może być już zajęty.");
            return;
        }
        navigate("/setup");
    }, [email, password, confirmPassword, register, navigate]);

    return (
        <div className="max-w-md mx-auto mt-20 bg-card p-8 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-6 text-main">Rejestracja</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1 text-main">Email</label>
                    <input className="w-full p-3 border rounded bg-card text-main" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {fieldErrors.email && <p className="text-danger text-sm mt-1">{fieldErrors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Hasło</label>
                    <input type="password" className="w-full p-3 border rounded bg-card text-main" placeholder="hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {fieldErrors.password && <p className="text-danger text-sm mt-1">{fieldErrors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm mb-1 text-main">Powtórz hasło</label>
                    <input type="password" className="w-full p-3 border rounded bg-card text-main" placeholder="powtórz hasło" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {fieldErrors.confirm && <p className="text-danger text-sm mt-1">{fieldErrors.confirm}</p>}
                </div>

                {error && <p className="text-danger text-sm">{error}</p>}

                <button className="w-full px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>Utwórz konto</button>
            </form>

            <div className="mt-4 text-sm text-secondary text-center">
                Masz już konto? <Link to="/login" className="text-accent">Zaloguj się</Link>
            </div>
        </div>
    );
}
