import { Request, Response, NextFunction } from "express";
import { AppError } from "../application/errors";

export function errorMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction

): void {
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message
            }
        })
        return;
    
    }

    console.error(err);

    res.status(500).json({
        error: {
            code: "UNKNOWN_ERROR",
            message: "An unknown error occurred"
        }
    })
}