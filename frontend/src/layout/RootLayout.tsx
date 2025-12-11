import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-main text-main transition-colors">
            <Navbar />
            <main className="px-6 py-6">
                <Outlet />
            </main>
        </div>
    );
}
