import {Request, Response, NextFunction } from "express";
import { JwtTokenService } from "../infrastructure/security/jwt-token-service";
import { ValidationError } from "../application/errors";


const tokenService = new JwtTokenService();

export function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new ValidationError("Missing or invalid authorization header");

    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = tokenService.verify(token);
        (req as any).user = payload;
        next();
    } catch {
        throw new ValidationError("Invalid or expired token");
    }
}