import { InternalError } from "./errors";
//import { Email } from "../domain/user/email.vo";
//import { registerUser } from "./user/register-user.usecase";

//registerUser({ email: "rohit@mail.com", password: "strongpassword", }) 

export type HealthStatus = { status: "ok"; timestamp: number; }; 

export function getHealthStatus(): HealthStatus { throw new InternalError("Health Check Failed"); // return { // status: "ok", // timestamp: Date.now(),
    // };
}

//Email.create("test@example.com");