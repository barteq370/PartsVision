import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
    createOrder,
    getOrdersByWorkshop,
    getOrdersByVehicle,
    getOrder,
    updateOrderStatus,
    deleteOrder,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem
} from "../controllers/orderController";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/workshop", authMiddleware, getOrdersByWorkshop);
router.get("/vehicle/:vehicleId", authMiddleware, getOrdersByVehicle);
router.get("/:orderId", authMiddleware, getOrder);
router.put("/:orderId/status", authMiddleware, updateOrderStatus);
router.delete("/:orderId", authMiddleware, deleteOrder);

router.post("/:orderId/items", authMiddleware, addOrderItem);
router.put("/items/:itemId", authMiddleware, updateOrderItem);
router.delete("/items/:itemId", authMiddleware, deleteOrderItem);

export default router;
