import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import workshopRoutes from "./routes/workshop";
import clientRoutes from "./routes/clientRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import orderRoutes from "./routes/orderRoutes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/workshops", workshopRoutes);
app.use("/clients", clientRoutes)
app.use("/vehicles", vehicleRoutes);
app.use("/orders", orderRoutes);

app.listen(4000, () => {
    console.log("Backend działa na http://localhost:4000");
});
