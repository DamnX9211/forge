import { Request, Response } from "express";
import { RegisterRequestDTO, RegisterResponseDTO } from "./types/user.dto";
import { registerUser } from "../application/user/register-user.usecase";
import { registerUserSchema } from "./types/user.dto";
import { ValidationError } from "../application/errors";
import { SqliteUserRepository } from "../infrastructure/user/user.repository.sqlite";
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt-password-hasher";
import { loginUser } from "../application/user/login-user.usecase";
import { JwtTokenService } from "../infrastructure/security/jwt-token-service";
import { container } from "../container";
import { RefreshToken } from "../domain/auth/refresh-token.entity";
import { refreshAccessToken } from "../application/auth/refresh-token.usecase";


export function registerUserController(
  req: Request,
  res: Response<RegisterResponseDTO>,
): void {
  const parsed = registerUserSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ValidationError(parsed.error.message);
  }
  const userRepo = container.userRepository;
  const hasher = container.passwordHasher;
  const result = registerUser(parsed.data, userRepo, hasher);

  const response: RegisterResponseDTO = {
    id: result.id,
    email: result.email,
    createdAt: result.createdAt.toISOString(),
  };
  res.status(201).json(response);
}

export function loginUserController(req: Request, res: Response): void {
  const { email, password } = req.body;

  const userRepo =  container.userRepository;
  const hasher = container.passwordHasher;
  const tokenService = container.tokenService;
  const refreshTokenRepo = container.refreshTokenRepository;

  const result = loginUser({ email, password }, userRepo, hasher, tokenService, refreshTokenRepo);

  res.status(200).json(result);
}

export function getMeController(req: Request, res: Response): void {
  const user = (req as any).user;
  if (!user) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
    });
    return;
  }

  res.status(200).json({
    id: user.userId,
    email: user.email,
  });
}

export function refreshTokenController(req: Request, res: Response) {
 const { refreshToken } = req.body;

 const result = refreshAccessToken(
  refreshToken,
  container.refreshTokenRepository,
  container.tokenService
 )
 res.status(200).json(result);
}
