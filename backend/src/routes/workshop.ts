import { Router } from "express";
import { createWorkshop } from "../controllers/workshopController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createWorkshop);

export default router;
