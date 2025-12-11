import { Router } from "express";
import { createVehicle, getVehiclesByClient, getVehicle, updateVehicle, deleteVehicle, getWorkshopVehicles } from "../controllers/vehicleController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/workshop", authMiddleware, getWorkshopVehicles);
router.get("/client/:clientId", authMiddleware, getVehiclesByClient);

router.post("/", authMiddleware, createVehicle);
router.get("/:vehicleId", authMiddleware, getVehicle);
router.put("/:vehicleId", authMiddleware, updateVehicle);
router.delete("/:vehicleId", authMiddleware, deleteVehicle);

export default router;
