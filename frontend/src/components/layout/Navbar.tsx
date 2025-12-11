import { Link } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";

export default function Navbar() {
    const dark = useThemeStore((s) => s.dark);
    const toggle = useThemeStore((s) => s.toggle);

    return (
        <nav className="w-full px-10 py-5 border-b border-theme bg-card text-main flex justify-between items-center">
            <Link to="/" className="text-2xl font-semibold text-main">
                PartsVision
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/" className="text-main hover:text-secondary transition">
                    Strona główna
                </Link>

                <Link to="/login" className="text-main hover:text-secondary transition">
                    Logowanie
                </Link>

                <Link
                    to="/register"
                    className="px-5 py-2 rounded-lg text-base text-white"
                    style={{ backgroundColor: "var(--accent)" }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--accent)")
                    }
                >
                    Zacznij teraz
                </Link>


                <button
                    onClick={toggle}
                    className="px-4 py-2 rounded-lg border border-theme text-main bg-card hover-bg-muted transition flex items-center gap-2"
                >
                    {dark ? (<>Jasny</>) : (<>Ciemny</>)}
                </button>
            </div>
        </nav >
    );
}
