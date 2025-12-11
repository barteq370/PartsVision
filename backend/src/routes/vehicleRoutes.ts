import { Router } from "express";
import { createVehicle, getVehiclesByClient, getVehicle, updateVehicle, deleteVehicle } from "../controllers/vehicleController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createVehicle);
router.get("/client/:clientId", authMiddleware, getVehiclesByClient);
router.get("/:vehicleId", authMiddleware, getVehicle);
router.put("/:vehicleId", authMiddleware, updateVehicle);
router.delete("/:vehicleId", authMiddleware, deleteVehicle);

export default router;
