import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children, role }: any) {
    const token = useAuthStore((s) => s.token);
    const user = useAuthStore((s) => s.user);
    const isInitialized = useAuthStore((s) => s.isInitialized);

    if (!isInitialized) {
        return <div>Ładowanie...</div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
