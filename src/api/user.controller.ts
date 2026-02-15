import { Request, Response } from "express";
import { RegisterRequestDTO, RegisterResponseDTO } from "./types/user.dto";
import { registerUser } from "../application/user/register-user.usecase";
import { registerUserSchema } from "./types/user.dto";
import { ValidationError } from "../application/errors";
import { SqliteUserRepository } from "../infrastructure/user/user.repository.sqlite";
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt-password-hasher";

export function registerUserController(
    req: Request,
    res: Response<RegisterResponseDTO>
): void {
    const parsed = registerUserSchema.safeParse(req.body);

    if(!parsed.success) {
        throw new ValidationError(parsed.error.message);
    }
    const userRepo = new SqliteUserRepository();
    const hasher = new BcryptPasswordHasher();
    const result = registerUser(parsed.data, userRepo, hasher);

    const response: RegisterResponseDTO = {
        id: result.id,
        email: result.email,
        createdAt: result.createdAt.toISOString(),
    
    };
    res.status(201).json(response);
}