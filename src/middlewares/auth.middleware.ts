import {type Request, type Response, type NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const sessionCookie = req.cookies.sessionId;

    if (!sessionCookie) {

        res.status(401).json({ message: "Не авторизован! Расстрел и бан на месте >:)." });
        return;
    }

    req.userId = sessionCookie; 
    next();
};

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}