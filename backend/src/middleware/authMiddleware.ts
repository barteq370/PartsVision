import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthUser } from "../types/express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ message: "No token" });

        const token = header.split(" ")[1];
        const decoded = verifyToken(token) as AuthUser;

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
