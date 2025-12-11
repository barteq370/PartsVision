import { Link } from "react-router-dom";
import FeatureCard from "../components/ui/FeatureCard";
import Footer from "../components/layout/Footer";

export default function Landing() {
    return (
        <div className="font-sans min-h-screen flex flex-col bg-main text-main">
            <header className="text-center px-6 py-20 bg-main">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        Zarządzaj warsztatem i zamówieniami części w jednym miejscu
                    </h1>

                    <p className="text-lg max-w-2xl mx-auto mb-10 text-secondary">
                        PartsVision przyspiesza współpracę z lokalnymi sklepami i hurtowniami.
                        Pobieraj dane pojazdów po VIN, twórz zlecenia i śledź dostępność części.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="px-7 py-3 rounded-lg text-lg text-white"
                            style={{ backgroundColor: "var(--accent)" }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
                        >
                            Zacznij teraz
                        </Link>

                        <a
                            href="#how"
                            className="px-6 py-3 rounded-lg text-lg border border-theme bg-card text-main hover-bg-muted transition"
                        >
                            Jak to działa
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1 bg-main">
                <section className="px-6 py-16 max-w-6xl mx-auto">
                    <h2 className="text-center text-3xl font-semibold mb-12">Dlaczego PartsVision?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                        <FeatureCard
                            title="Koniec telefonów"
                            description="Zamiast dzwonić do sklepu wyślesz zapytanie z listą części i VIN-em auta."
                        />
                        <FeatureCard
                            title="Automatyczne dopasowanie"
                            description="Integracja z InterCars API pozwala pobierać dane pojazdu i numery OE."
                        />
                        <FeatureCard
                            title="Przejrzysta historia"
                            description="Każde zlecenie i użyte części zapisane są w historii warsztatu."
                        />
                    </div>
                </section>

                <section id="forwhom" className="px-6 py-16 max-w-6xl mx-auto">
                    <h2 className="text-center text-3xl font-semibold mb-12">Dla kogo?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                        <FeatureCard
                            title="Warsztat"
                            description="Szybkie tworzenie zleceń, baza klientów i pojazdów oraz bezbłędne zamówienia części."
                        />
                        <FeatureCard
                            title="Sklep"
                            description="Zarządzanie magazynem, odbieranie zapytań i szybka informacja o dostępności."
                        />
                        <FeatureCard
                            title="Klient"
                            description="Śledzenie historii napraw i statusu bieżących usług."
                        />
                    </div>
                </section>

                <section className="px-6 py-16 bg-main">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold mb-6">Gotowy, by przyspieszyć pracę warsztatu?</h2>
                        <p className="text-lg text-secondary mb-6">
                            Zarejestruj warsztat i połącz go ze sklepami aby natychmiast zacząć oszczędzać czas.
                        </p>

                        <Link
                            to="/register"
                            className="px-6 py-3 rounded-lg text-white"
                            style={{ backgroundColor: "var(--accent)" }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
                        >
                            Utwórz konto warsztatu
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
