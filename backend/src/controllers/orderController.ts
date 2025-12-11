import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { vehicleId, description } = req.body;
        if (!vehicleId || !description) return res.status(400).json({ message: "Missing fields" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId }, include: { client: true } });
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        if (vehicle.client.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        const order = await prisma.order.create({
            data: {
                description,
                status: "PENDING",
                vehicleId,
                workshopId: workshop.id
            }
        });

        return res.status(201).json(order);
    } catch (err) {
        console.error("createOrder error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getOrdersByWorkshop = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const orders = await prisma.order.findMany({
            where: { workshopId: workshop.id },
            include: { vehicle: true },
            orderBy: { createdAt: "desc" }
        });

        return res.json(orders);
    } catch (err) {
        console.error("getOrdersByWorkshop error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getOrdersByVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = parseInt(req.params.vehicleId, 10);
        if (isNaN(vehicleId)) return res.status(400).json({ message: "Invalid vehicle id" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId }, include: { client: true } });
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        if (vehicle.client.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        const orders = await prisma.order.findMany({
            where: { vehicleId },
            include: { items: true },
            orderBy: { createdAt: "desc" }
        });

        return res.json(orders);
    } catch (err) {
        console.error("getOrdersByVehicle error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId, 10);
        if (isNaN(orderId)) return res.status(400).json({ message: "Invalid order id" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { vehicle: true, items: true }
        });

        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        return res.json(order);
    } catch (err) {
        console.error("getOrder error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId, 10);
        const { status } = req.body;
        if (isNaN(orderId) || !status) return res.status(400).json({ message: "Missing data" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        return res.json(updated);
    } catch (err) {
        console.error("updateOrderStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId, 10);
        if (isNaN(orderId)) return res.status(400).json({ message: "Invalid order id" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        await prisma.orderItem.deleteMany({ where: { orderId } });
        await prisma.order.delete({ where: { id: orderId } });

        return res.status(204).send();
    } catch (err) {
        console.error("deleteOrder error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const addOrderItem = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId, 10);
        const { name, oeNumber, quantity, price } = req.body;
        if (isNaN(orderId) || !name || !quantity) return res.status(400).json({ message: "Missing fields" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        const item = await prisma.orderItem.create({
            data: {
                name,
                oeNumber: oeNumber || "",
                quantity,
                price: price || 0,
                orderId
            }
        });

        return res.status(201).json(item);
    } catch (err) {
        console.error("addOrderItem error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateOrderItem = async (req: Request, res: Response) => {
    try {
        const itemId = parseInt(req.params.itemId, 10);
        const { name, oeNumber, quantity, price } = req.body;
        if (isNaN(itemId) || !name || !quantity) return res.status(400).json({ message: "Missing fields" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const item = await prisma.orderItem.findUnique({
            where: { id: itemId },
            include: { order: true }
        });
        if (!item) return res.status(404).json({ message: "Item not found" });
        if (item.order.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        const updated = await prisma.orderItem.update({
            where: { id: itemId },
            data: { name, oeNumber: oeNumber || "", quantity, price: price || 0 }
        });

        return res.json(updated);
    } catch (err) {
        console.error("updateOrderItem error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
    try {
        const itemId = parseInt(req.params.itemId, 10);
        if (isNaN(itemId)) return res.status(400).json({ message: "Invalid item id" });

        const userId = req.user?.userId;
        const workshop = await prisma.workshop.findFirst({ where: { userId } });
        if (!workshop) return res.status(400).json({ message: "Workshop not found" });

        const item = await prisma.orderItem.findUnique({ where: { id: itemId }, include: { order: true } });
        if (!item) return res.status(404).json({ message: "Item not found" });
        if (item.order.workshopId !== workshop.id) return res.status(403).json({ message: "Forbidden" });

        await prisma.orderItem.delete({ where: { id: itemId } });

        return res.status(204).send();
    } catch (err) {
        console.error("deleteOrderItem error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
