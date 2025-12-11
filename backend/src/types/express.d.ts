import "express";

export interface AuthUser {
    userId: number;
    role: string;
    iat?: number;
    exp?: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}
