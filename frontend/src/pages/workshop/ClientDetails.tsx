import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function ClientDetails() {
    const { clientId } = useParams();
    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();

    const [client, setClient] = useState<any>(null);
    const [vehicles, setVehicles] = useState<any[]>([]); // NOWE
    const [loading, setLoading] = useState(true);

    const fetchClient = async () => {
        try {
            const res = await fetch(`http://localhost:4000/clients/${clientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                navigate("/workshop/clients");
                return;
            }

            const data = await res.json();
            setClient(data);

        } catch (err) {
            console.error("Error fetching client:", err);
        }
    };

    const fetchVehicles = async () => {
        try {
            const res = await fetch(`http://localhost:4000/vehicles/client/${clientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                return;
            }

            const data = await res.json();
            setVehicles(data);

        } catch (err) {
            console.error("Error fetching vehicles:", err);
        }
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await fetchClient();
            await fetchVehicles();
            setLoading(false);
        };
        load();
    }, [clientId]);

    if (loading) return <div>Ładowanie danych klienta...</div>;

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz usunąć tego klienta wraz z pojazdami?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:4000/clients/${clientId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                alert("Nie udało się usunąć klienta.");
                return;
            }

            navigate("/workshop/clients");

        } catch (err) {
            console.error("Delete client error:", err);
            alert("Wystąpił błąd serwera");
        }
    };


    return (
        <div>
            <Link to="/workshop/clients" className="text-sm hover:text-blue-600">
                &larr; Powrót
            </Link>

            <h1 className="text-2xl font-semibold mt-4 mb-6">Szczegóły klienta</h1>

            <div className="bg-white p-6 rounded shadow mb-10">
                <div className="text-xl font-medium mb-2">{client.name}</div>
                <div className="text-gray-600 mb-2">Telefon: {client.phone}</div>
                <div className="text-gray-600 mb-4">Email: {client.email || "brak"}</div>

                <div className="flex gap-4">
                    <Link to={`/workshop/clients/${clientId}/edit`} className="btn-primary">
                        Edytuj klienta
                    </Link>

                    <button className="btn-secondary" onClick={handleDelete}>
                        Usuń klienta
                    </button>

                </div>
            </div>


            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pojazdy</h2>
                <Link to={`/workshop/clients/${clientId}/vehicles/new`} className="btn-primary">
                    Dodaj pojazd
                </Link>
            </div>

            {vehicles.length === 0 ? (
                <div className="text-gray-500">Brak pojazdów</div>
            ) : (
                <div className="space-y-4">
                    {vehicles.map((v) => (
                        <div
                            key={v.id}
                            className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium">{v.brand} {v.model}</div>
                                <div className="text-sm text-gray-600">VIN: {v.vin}</div>
                                <div className="text-sm text-gray-600">Rok: {v.year}</div>
                            </div>

                            <Link
                                to={`/workshop/vehicles/${v.id}`}
                                className="text-sm hover:text-blue-600"
                            >
                                Szczegóły
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
