import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createVehicle = async (req: Request, res: Response) => {
    try {
        const { vin, brand, model, year, clientId } = req.body;

        if (!vin || !brand || !model || !year || !clientId) {
            return res.status(400).json({ message: "Missing fields" });
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

        const existVin = await prisma.vehicle.findUnique({
            where: { vin }
        });

        if (existVin) {
            return res.status(409).json({ message: "VIN already exists" });
        }

        const created = await prisma.vehicle.create({
            data: {
                vin,
                brand,
                model,
                year,
                clientId
            }
        });

        return res.status(201).json(created);

    } catch (err) {
        console.error("createVehicle error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getVehiclesByClient = async (req: Request, res: Response) => {
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

        const vehicles = await prisma.vehicle.findMany({
            where: { clientId: clientId },
            orderBy: { id: "desc" }
        });

        return res.json(vehicles);

    } catch (err) {
        console.error("getVehiclesByClient error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = parseInt(req.params.vehicleId, 10);
        if (isNaN(vehicleId)) {
            return res.status(400).json({ message: "Invalid vehicle id" });
        }

        const userId = req.user?.userId;

        const workshop = await prisma.workshop.findFirst({
            where: { userId }
        });

        if (!workshop) {
            return res.status(400).json({ message: "Workshop not found" });
        }

        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
            include: {
                client: true,
                orders: true
            }
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        if (vehicle.client.workshopId !== workshop.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        return res.json(vehicle);

    } catch (err) {
        console.error("getVehicle error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = parseInt(req.params.vehicleId, 10);
        if (isNaN(vehicleId)) {
            return res.status(400).json({ message: "Invalid vehicle id" });
        }

        const { vin, brand, model, year } = req.body;

        const userId = req.user?.userId;

        const workshop = await prisma.workshop.findFirst({
            where: { userId }
        });

        if (!workshop) {
            return res.status(400).json({ message: "Workshop not found" });
        }

        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
            include: { client: true }
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        if (vehicle.client.workshopId !== workshop.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        if (vin && vin !== vehicle.vin) {
            const exists = await prisma.vehicle.findUnique({
                where: { vin }
            });

            if (exists) {
                return res.status(409).json({ message: "VIN already in use" });
            }
        }

        const updated = await prisma.vehicle.update({
            where: { id: vehicleId },
            data: {
                vin,
                brand,
                model,
                year
            }
        });

        return res.json(updated);

    } catch (err) {
        console.error("updateVehicle error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = parseInt(req.params.vehicleId, 10);
        if (isNaN(vehicleId)) {
            return res.status(400).json({ message: "Invalid vehicle id" });
        }

        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const workshop = await prisma.workshop.findFirst({
            where: { userId }
        });

        if (!workshop) {
            return res.status(400).json({ message: "Workshop not found" });
        }

        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
            include: { client: true }
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        if (vehicle.client.workshopId !== workshop.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await prisma.order.deleteMany({
            where: { vehicleId: vehicleId }
        });

        await prisma.vehicle.delete({
            where: { id: vehicleId }
        });

        return res.status(204).send();

    } catch (err) {
        console.error("deleteVehicle error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
