import { InternalError } from "./errors";

export type HealthStatus = {
    status: "ok";
    timestamp: number;
};

export function getHealthStatus(): HealthStatus {
    throw new InternalError("Health Check Failed");
    // return {
    //     status: "ok",
    //     timestamp: Date.now(),
    // };
}