import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import React from "react";

interface Props {
    children: React.ReactNode;
    role?: string;
}

export default function ProtectedRoute({ children, role }: Props) {
    const token = useAuthStore((s) => s.token);
    const user = useAuthStore((s) => s.user);

    // niezalogowany
    if (!token) return <Navigate to="/login" replace />;

    // fetchMe jeszcze się ładuje
    if (token && !user) return <div>Ładowanie...</div>;

    // niewłaściwa rola
    if (role && user?.role !== role) {
        return <Navigate to="/setup" replace />;
    }

    return <>{children}</>;
}
