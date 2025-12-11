import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const passwordHash = await hashPassword(password);

        await prisma.user.create({
            data: { email, passwordHash, role: "USER" }
        });

        return res.status(201).json({ message: "User created" });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const valid = await comparePassword(password, user.passwordHash);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken({ userId: user.id, role: user.role });

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId;  // z tokena
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                role: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ user });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};
