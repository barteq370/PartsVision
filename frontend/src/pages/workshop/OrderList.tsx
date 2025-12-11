import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function OrdersList() {
    const token = useAuthStore((s) => s.token);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/orders/workshop", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    if (loading) return <div>Ładowanie zleceń...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Zlecenia</h1>
                <Link to="/workshop" className="btn-secondary">Powrót</Link>
            </div>

            {orders.length === 0 ? (
                <div className="text-gray-500">Brak zleceń</div>
            ) : (
                <div className="space-y-4">
                    {orders.map(o => (
                        <div key={o.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                            <div>
                                <div className="font-medium">Zlecenie #{o.id}</div>
                                <div className="text-sm text-gray-600">{o.description}</div>
                                <div className="text-sm text-gray-600">Pojazd: {o.vehicle?.brand} {o.vehicle?.model}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                                <Link to={`/workshop/orders/${o.id}`} className="text-sm hover:text-blue-600">Szczegóły</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
