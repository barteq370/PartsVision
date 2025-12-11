import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createClient = async (req: Request, res: Response) => {
    try {
        const { name, phone, email } = req.body;

        const userId = req.user?.userId;

        const workshop = await prisma.workshop.findFirst({
            where: { userId }
        });

        if (!workshop) {
            return res.status(400).json({ message: "Workshop not found" });
        }

        const client = await prisma.client.create({
            data: {
                name,
                phone,
                email,
                workshopId: workshop.id
            }
        });

        return res.json(client);

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getClients = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        const workshop = await prisma.workshop.findFirst({
            where: { userId }
        });

        if (!workshop) {
            return res.status(400).json({ message: "Workshop not found" });
        }

        const clients = await prisma.client.findMany({
            where: {
                workshopId: workshop.id
            },
            orderBy: {
                id: "desc"
            }
        });

        return res.json(clients);

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getClient = async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.clientId, 10);
        if (Number.isNaN(clientId)) {
            return res.status(400).json({ message: "Invalid client id" });
        }

        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const client = await prisma.client.findUnique({
            where: { id: clientId }
        });

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop || client.workshopId !== workshop.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // powiązane pojazdy
        // const clientWithVehicles = await prisma.client.findUnique({ where: { id: clientId }, include: { vehicles: true } });
        // return res.json(clientWithVehicles);


        return res.json(client);

    } catch (err) {
        console.error("getClient error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.clientId, 10);
        if (isNaN(clientId)) {
            return res.status(400).json({ message: "Invalid client id" });
        }

        const { name, phone, email } = req.body;

        const userId = req.user?.userId;

        const workshop = await prisma.workshop.findFirst({
            where: { userId }
        });

        if (!workshop) {
            return res.status(400).json({ message: "Workshop not found" });
        }

        const client = await prisma.client.findUnique({
            where: { id: clientId }
        });

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        if (client.workshopId !== workshop.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const updatedClient = await prisma.client.update({
            where: { id: clientId },
            data: {
                name,
                phone,
                email
            }
        });

        return res.json(updatedClient);

    } catch (err) {
        console.error("updateClient error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


export const deleteClient = async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.clientId, 10);
        if (isNaN(clientId)) {
            return res.status(400).json({ message: "Invalid client id" });
        }

        const userId = req.user?.userId;

        const workshop = await prisma.workshop.findFirst({
            where: { userId }
        });

        if (!workshop) {
            return res.status(400).json({ message: "Workshop not found" });
        }

        const client = await prisma.client.findUnique({
            where: { id: clientId }
        });

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        if (client.workshopId !== workshop.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await prisma.client.delete({
            where: { id: clientId }
        });

        return res.status(204).send();

    } catch (err) {
        console.error("deleteClient error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
