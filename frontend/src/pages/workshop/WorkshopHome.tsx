export default function WorkshopHome() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Panel warsztatu</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="card">
                    <div className="card-title">Klienci</div>
                    <div className="card-text">Zarządzaj klientami i pojazdami</div>
                    <a href="/workshop/clients" className="btn-primary mt-4 inline-block">Przejdź</a>
                </div>

                <div className="card">
                    <div className="card-title">Zlecenia</div>
                    <div className="card-text">Dodawaj, edytuj i śledź zlecenia napraw</div>
                    <a href="/workshop/orders" className="btn-primary mt-4 inline-block">Przejdź</a>
                </div>

                <div className="card">
                    <div className="card-title">Pojazdy</div>
                    <div className="card-text">Lista pojazdów klientów</div>
                    <a href="/workshop/vehicles" className="btn-primary mt-4 inline-block">Przejdź</a>
                </div>

            </div>
        </div>
    );
}
