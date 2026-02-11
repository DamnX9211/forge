type AppConfig = {
    port: number;
    env: "development" | "production" | "test";
};

function loadConfig(): AppConfig {
    const port = Number(process.env.port ?? 3000);
    const env = (process.env.NODE_ENV ?? "development") as AppConfig["env"];

    if (Number.isNaN(port)) {
        throw new Error("Port must be a number");
    }
    return { port, env };
}

export const config = loadConfig();