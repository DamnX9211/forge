import express, { Application } from "express";
import { healthcontroller } from "./api/health.controller";
import { errorMiddleware } from "./api/error.middleware";
import { getMeController, loginUserController, registerUserController } from "./api/user.controller";
import { authMiddleware } from "./api/auth.middleware";


export function createApp(): Application {
    const app = express();

    app.use(express.json());
    app.get("/health", healthcontroller);
    app.post("/users/register", registerUserController);
    app.post("/users/login", loginUserController);
    app.get("/users/me", authMiddleware, getMeController);
    app.use(errorMiddleware);
    return app;
}