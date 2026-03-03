import { RefreshTokenRepository } from "../../domain/auth/refresh-token.repository";
import { TokenService } from "../../domain/auth/token-service";
import { ValidationError } from "../errors";
import { RefreshToken } from "../../domain/auth/refresh-token.entity";
import { randomUUID } from "crypto";

export function refreshAccessToken(
  token: string,
  refreshRepo: RefreshTokenRepository,
  tokenService: TokenService
) {
  const stored = refreshRepo.find(token);

  if (!stored) {
    throw new ValidationError("Invalid refresh token");
  }

  if (stored.expiresAt < new Date()) {
    refreshRepo.delete(token);
    throw new ValidationError("Refresh token expired");
  }
  
  refreshRepo.delete(token);

  const newRefreshTokenValue = randomUUID();

  const newRefreshToken = new RefreshToken({
    id: randomUUID(),
    userId: stored.userId,
    token: newRefreshTokenValue,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  refreshRepo.save(newRefreshToken);

  const newAccessToken = tokenService.sign({
    userId: stored.userId,
    email: "", // we don't store email here, can extend later
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshTokenValue,
  };
}