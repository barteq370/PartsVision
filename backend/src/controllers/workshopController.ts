import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createWorkshop = async (req: Request, res: Response) => {
    try {
        const user = req.user; // z authMiddleware
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const { name } = req.body;

        if (!name || name.trim().length === 0) {
            return res.status(400).json({ message: "Nazwa warsztatu jest wymagana" });
        }

        // tworzenie warsztatu
        const workshop = await prisma.workshop.create({
            data: {
                name,
                userId: user.userId
            }
        });

        // aktualizacja roli usera
        await prisma.user.update({
            where: { id: user.userId },
            data: { role: "WORKSHOP" }
        });

        return res.json(workshop);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
