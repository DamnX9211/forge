type AppConfig = {
    port: number;
    env: "development" | "production" | "test";
    jwtSecret: string;
};

function loadConfig(): AppConfig {
    const port = Number(process.env.port ?? 3000);
    const env = (process.env.NODE_ENV ?? "development") as AppConfig["env"];
    const jwtSecret = process.env.JWT_SECRET ?? "dev-secret";


    if (Number.isNaN(port)) {
        throw new Error("Port must be a number");
    }
    if(!jwtSecret){
        throw new Error("JWT_SECRET is required");
    }
    return { port, env, jwtSecret };
}

export const config = loadConfig();