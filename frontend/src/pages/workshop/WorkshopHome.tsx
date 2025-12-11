import { Link } from "react-router-dom";

export default function WorkshopHome() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Panel warsztatu</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="card">
                    <div className="card-title">Klienci</div>
                    <div className="card-text">Zarządzaj klientami i pojazdami</div>
                    <Link to="/workshop/clients" className="btn-primary mt-4 inline-block">
                        Przejdź
                    </Link>
                </div>

                <div className="card">
                    <div className="card-title">Zlecenia</div>
                    <div className="card-text">Dodawaj, edytuj i śledź zlecenia napraw</div>
                    <Link to="/workshop/orders" className="btn-primary mt-4 inline-block">
                        Przejdź
                    </Link>
                </div>

                <div className="card">
                    <div className="card-title">Pojazdy</div>
                    <div className="card-text">Lista pojazdów klientów</div>
                    <Link to="/workshop/vehicles" className="btn-primary mt-4 inline-block">
                        Przejdź
                    </Link>
                </div>

            </div>
        </div>
    );
}
