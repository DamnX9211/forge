import express, { Application, Request, Response, NextFunction } from "express";
import { healthcontroller } from "./api/health.controller";
import { errorMiddleware } from "./api/error.middleware";
import { registerUserController } from "./api/user.controller";


export function createApp(): Application {
    const app = express();

    // app.use((req: Request, _res: Response, next: NextFunction) => {
    //     console.log(`Incoming: ${req.method} ${req.path}`);
    //     next();
    // });
    app.use(express.json());
    app.get("/health", healthcontroller);
    app.post("/users/register", registerUserController);
    app.use(errorMiddleware);
    return app;
}