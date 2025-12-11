import { Link } from "react-router-dom";
import FeatureCard from "../components/ui/FeatureCard";
import Footer from "../components/layout/Footer";

export default function Landing() {
    return (
        <div className="font-sans min-h-screen flex flex-col">
            <header className="hero">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="hero-title">Zarządzaj warsztatem i zamówieniami części w jednym miejscu</h1>
                    <p className="hero-text">
                        PartsVision przyspiesza współpracę z lokalnymi sklepami i hurtowniami. Pobieraj dane pojazdów po VIN,
                        twórz zlecenia, wysyłaj zapytania o części i śledź ich dostępność.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="hero-btn">Zacznij teraz</Link>
                        <a href="#how" className="btn-secondary">Jak to działa</a>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="px-6 py-16 max-w-content">
                    <h2 className="section-title">Dlaczego PartsVision?</h2>

                    <div className="features-grid mt-10">
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

                <section id="forwhom" className="px-6 py-12 bg-gray-50 max-w-content">
                    <h2 className="section-title">Dla kogo?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
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

                <section className="px-6 py-16 bg-linear-to-b from-white to-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="section-title">Gotowy, by przyspieszyć pracę warsztatu?</h2>
                        <p className="hero-text">Zarejestruj warsztat i połącz go ze sklepami aby natychmiast zacząć oszczędzać czas.</p>
                        <Link to="/register" className="btn-primary">Utwórz konto warsztatu</Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
