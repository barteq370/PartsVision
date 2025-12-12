import { Link } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";
import { useState } from "react";

export default function Navbar() {
    const dark = useThemeStore((s) => s.dark);
    const toggle = useThemeStore((s) => s.toggle);

    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full px-6 py-4 border-b border-theme bg-card text-main flex items-center justify-between">
            <Link to="/" className="text-2xl font-semibold text-main">
                PartsVision
            </Link>

            <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="hover:text-secondary transition">Strona główna</Link>
                <Link to="/login" className="hover:text-secondary transition">Logowanie</Link>
                <Link
                    to="/register"
                    className="px-5 py-2 rounded-lg text-white"
                    style={{ backgroundColor: "var(--accent)" }}
                >
                    Zacznij teraz
                </Link>

                <button
                    onClick={toggle}
                    className="px-4 py-2 rounded-lg border border-theme hover-bg-muted transition"
                >
                    {dark ? "Jasny" : "Ciemny"}
                </button>
            </div>


            <button
                className="block md:hidden text-main"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>


            {open && (
                <div className="absolute top-16 left-0 w-full bg-card border-b border-theme flex flex-col p-4 md:hidden z-50">
                    <Link to="/" className="py-3 hover:text-secondary text-center" onClick={() => setOpen(false)}>
                        Strona główna
                    </Link>
                    <Link to="/login" className="py-3 hover:text-secondary text-center" onClick={() => setOpen(false)}>
                        Logowanie
                    </Link>
                    <Link
                        to="/register"
                        className="py-3 px-3 rounded-lg text-white mt-2 text-center"
                        style={{ backgroundColor: "var(--accent)" }}
                        onClick={() => setOpen(false)}
                    >
                        Zacznij teraz
                    </Link>

                    <button
                        onClick={() => {
                            toggle();
                            setOpen(true);
                        }}
                        className="mt-3 px-4 py-2 rounded-lg border border-theme hover-bg-muted"
                    >
                        {dark ? "Jasny" : "Ciemny"}
                    </button>
                </div>
            )}
        </nav>
    );
}
