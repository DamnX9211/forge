import express, { Application, Request, Response, NextFunction } from "express";
import { healthcontroller } from "./api/health.controller";
import { errorMiddleware } from "./api/error.middleware";


export function createApp(): Application {
    const app = express();

    // app.use((req: Request, _res: Response, next: NextFunction) => {
    //     console.log(`Incoming: ${req.method} ${req.path}`);
    //     next();
    // });

    app.get("/health", healthcontroller);
    app.use(errorMiddleware);
    return app;
}