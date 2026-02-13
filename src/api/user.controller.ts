import { Request, Response } from "express";
import { RegisterRequestDTO, RegisterResponseDTO } from "./types/user.dto";
import { registerUser } from "../application/user/register-user.usecase";

export function registerUserController(
    req: Request<unknown, unknown, RegisterRequestDTO>,
    res: Response<RegisterResponseDTO>
): void {
    const result = registerUser(req.body);

    const response: RegisterResponseDTO = {
        id: result.id,
        email: result.email,
        createdAt: result.createdAt.toISOString(),
    
    };
    res.status(201).json(response);
}