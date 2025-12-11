import { Link } from "react-router-dom";

export default function WorkshopHome() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6 text-main">Panel warsztatu</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl shadow bg-card text-center">
                    <div className="text-xl font-semibold mb-2 text-main">Klienci</div>
                    <div className="text-secondary mb-4">Zarządzaj klientami i pojazdami</div>
                    <Link to="/workshop/clients" className="px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>Przejdź</Link>
                </div>

                <div className="p-6 rounded-xl shadow bg-card text-center">
                    <div className="text-xl font-semibold mb-2 text-main">Zlecenia</div>
                    <div className="text-secondary mb-4">Dodawaj, edytuj i śledź zlecenia napraw</div>
                    <Link to="/workshop/orders" className="px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>Przejdź</Link>
                </div>

                <div className="p-6 rounded-xl shadow bg-card text-center">
                    <div className="text-xl font-semibold mb-2 text-main">Pojazdy</div>
                    <div className="text-secondary mb-4">Lista pojazdów klientów</div>
                    <Link to="/workshop/vehicles" className="px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }}>Przejdź</Link>
                </div>
            </div>
        </div>
    );
}
