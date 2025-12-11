import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createClient, getClients, getClient, updateClient, deleteClient } from "../controllers/clientController";

const router = Router();

router.post("/", authMiddleware, createClient);
router.get("/", authMiddleware, getClients);
router.get("/:clientId", authMiddleware, getClient);
router.put("/:clientId", authMiddleware, updateClient);
router.delete("/:clientId", authMiddleware, deleteClient);


export default router;
