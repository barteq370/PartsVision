import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../config/api";

export default function OrderDetails() {
    const { orderId } = useParams();
    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemQty, setItemQty] = useState(1);
    const [itemPrice, setItemPrice] = useState(0);
    const [itemError, setItemError] = useState("");

    const fetchOrder = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) {
                navigate("/workshop/orders");
                return;
            }
            const data = await res.json();
            setOrder(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [orderId, token, navigate]);

    useEffect(() => { fetchOrder(); }, [fetchOrder]);

    const updateStatus = useCallback(async (newStatus: string) => {
        setStatusUpdating(true);
        try {
            const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus })
            });
            if (!res.ok) { alert("Nie udało się zmienić statusu"); return; }
            await fetchOrder();
        } catch (err) {
            console.error(err);
        } finally {
            setStatusUpdating(false);
        }
    }, [orderId, token, fetchOrder]);

    const addItem = useCallback(async () => {
        if (!itemName.trim()) { setItemError("Nazwa wymagana"); return; }
        if (itemQty <= 0) { setItemError("Ilość musi być większa niż 0"); return; }
        if (itemPrice < 0) { setItemError("Cena nie może być ujemna"); return; }
        setItemError("");
        try {
            const res = await fetch(`${API_URL}/orders/${orderId}/items`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name: itemName, oeNumber: "", quantity: Number(itemQty), price: Number(itemPrice) })
            });
            if (!res.ok) { alert("Nie udało się dodać pozycji"); return; }
            setItemName(""); setItemQty(1); setItemPrice(0);
            await fetchOrder();
        } catch (err) {
            console.error(err);
        }
    }, [itemName, itemQty, itemPrice, orderId, token, fetchOrder]);

    const deleteItem = useCallback(async (itemId: number) => {
        if (!confirm("Usuń pozycję?")) return;
        try {
            const res = await fetch(`${API_URL}/orders/items/${itemId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) { alert("Nie udało się usunąć pozycji"); return; }
            await fetchOrder();
        } catch (err) {
            console.error(err);
        }
    }, [token, fetchOrder]);

    if (loading) return <div>Ładowanie zlecenia...</div>;
    if (!order) return <div>Brak zlecenia</div>;

    return (
        <div>
            <Link to="/workshop/orders" className="text-sm text-accent">&larr; Powrót</Link>

            <h1 className="text-2xl font-semibold mt-4 mb-6 text-main">Zlecenie #{order.id}</h1>

            <div className="bg-card p-6 rounded shadow mb-6">
                <div className="mb-2 font-medium text-main">{order.description}</div>
                <div className="text-secondary mb-2">Pojazd: <Link to={`/workshop/vehicles/${order.vehicle.id}`} className="text-accent">{order.vehicle.brand} {order.vehicle.model}</Link></div>
                <div className="text-secondary">Status: {order.status}</div>

                <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: "var(--accent)" }} onClick={() => updateStatus("IN_PROGRESS")} disabled={statusUpdating}>Rozpocznij</button>
                    <button className="px-4 py-2 rounded-lg border border-theme bg-card text-main" onClick={() => updateStatus("DONE")} disabled={statusUpdating}>Zakończ</button>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-main">Pozycje</h2>

            <div className="bg-card p-4 rounded shadow mb-4">
                <div className="mb-3">
                    <label className="block text-sm text-main mb-1">Nazwa części</label>
                    <input
                        className="w-full p-2 border rounded mb-4 bg-card text-main"
                        placeholder="Np. filtr oleju"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />

                    <div className="flex gap-4 items-end">

                        <div className="flex flex-col">
                            <label className="text-sm text-main mb-1">Ilość</label>
                            <input
                                className="p-2 border rounded w-24 bg-card text-main"
                                type="number"
                                value={itemQty}
                                onChange={(e) => setItemQty(Number(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-main mb-1">Cena (zł)</label>
                            <input
                                className="p-2 border rounded w-36 bg-card text-main"
                                type="number"
                                value={itemPrice}
                                onChange={(e) => setItemPrice(Number(e.target.value))}
                            />
                        </div>

                        <button
                            className="px-4 py-2 h-[42px] rounded-lg text-white"
                            style={{ backgroundColor: "var(--accent)" }}
                            onClick={addItem}
                        >
                            Dodaj
                        </button>
                    </div>

                    {itemError && (
                        <p className="text-danger text-sm mt-2">{itemError}</p>
                    )}
                </div>

                {order.items.length === 0 ? (
                    <div className="text-secondary">Brak pozycji</div>
                ) : (
                    <div className="space-y-2">
                        {order.items.map((it: any) => (
                            <div
                                key={it.id}
                                className="p-3 border rounded flex justify-between items-center bg-card"
                            >
                                <div>
                                    <div className="font-medium text-main">{it.name}</div>
                                    <div className="text-sm text-secondary">OE: {it.oeNumber || "-"}</div>
                                    <div className="text-sm text-secondary">
                                        Ilość: {it.quantity} | Cena: {it.price} zł
                                    </div>
                                </div>
                                <button
                                    className="text-sm"
                                    style={{ color: "var(--danger)" }}
                                    onClick={() => deleteItem(it.id)}
                                >
                                    Usuń
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
