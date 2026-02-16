import express, { Application } from "express";
import { healthcontroller } from "./api/health.controller";
import { errorMiddleware } from "./api/error.middleware";
import { loginUserController, registerUserController } from "./api/user.controller";


export function createApp(): Application {
    const app = express();

    app.use(express.json());
    app.get("/health", healthcontroller);
    app.post("/users/register", registerUserController);
    app.post("/users/login", loginUserController)
    app.use(errorMiddleware);
    return app;
}