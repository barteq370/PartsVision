import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import RootLayout from "./layout/RootLayout";
import WorkshopLayout from "./layout/WorkshopLayout";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Setup from "./pages/setup/Setup";
import WorkshopSetup from "./pages/setup/WorkshopSetup";

import WorkshopHome from "./pages/workshop/WorkshopHome";
import WorkshopClients from "./pages/workshop/WorkshopClients";
import ClientCreate from "./pages/workshop/ClientCreate";
import ClientEdit from "./pages/workshop/ClientEdit";
import ClientDetails from "./pages/workshop/ClientDetails";

import VehicleCreate from "./pages/workshop/VehicleCreate";
import VehicleDetails from "./pages/workshop/VehicleDetails";

import ProtectedRoute from "./components/ProtectedRoute";

import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import VehicleEdit from "./pages/workshop/VehicleEdit";
import OrdersList from "./pages/workshop/OrderList";
import OrderDetails from "./pages/workshop/OrderDetails";

// ------------------------------------------
// InitAuth - wczytuje token + dane usera
// ------------------------------------------
function InitAuth() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return null;
}

// ------------------------------------------
// Routing
// ------------------------------------------
const router = createBrowserRouter([
  // ----------------------------------------
  // PUBLIC
  // ----------------------------------------
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // setup usera
      { path: "setup", element: <Setup /> },
      { path: "setup/workshop", element: <WorkshopSetup /> },
    ],
  },

  // ----------------------------------------
  // WORKSHOP PANEL
  // ----------------------------------------
  {
    path: "/workshop",
    element: (
      <ProtectedRoute role="WORKSHOP">
        <WorkshopLayout />
      </ProtectedRoute>
    ),

    children: [
      // dashboard
      { index: true, element: <WorkshopHome /> },

      // -----------------------------
      // KLIENCI
      // -----------------------------
      { path: "clients", element: <WorkshopClients /> },
      { path: "clients/new", element: <ClientCreate /> },
      { path: "clients/:clientId/edit", element: <ClientEdit /> },
      { path: "clients/:clientId", element: <ClientDetails /> },
      { path: "clients/:clientId/vehicles/new", element: <VehicleCreate /> },

      { path: "vehicles/:vehicleId", element: <VehicleDetails /> },
      { path: "vehicles/:vehicleId/edit", element: <VehicleEdit /> },

      { path: "orders", element: <OrdersList /> },
      { path: "orders/:orderId", element: <OrderDetails /> }

    ],
  },
]);

// ------------------------------------------
// Render
// ------------------------------------------
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InitAuth />
    <RouterProvider router={router} />
  </StrictMode>
);
