export type HealthStatus = {
    status: "ok";
    timestamp: number;
};

export function getHealthStatus(): HealthStatus {
    return {
        status: "ok",
        timestamp: Date.now(),
    };
}