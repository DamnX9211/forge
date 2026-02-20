import { SqliteUserRepository } from "./infrastructure/user/user.repository.sqlite";
import { BcryptPasswordHasher } from "./infrastructure/security/bcrypt-password-hasher";
import { JwtTokenService } from "./infrastructure/security/jwt-token-service";
import  { config }  from "./config";
import { SQLiteRefreshTokenRepository } from "./infrastructure/auth/refresh-token.repository.sqlite";


const userRepository = new SqliteUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService(config.jwtSecret);
const refreshTokenRepository = new SQLiteRefreshTokenRepository();

export const container = {
    userRepository,
    passwordHasher,
    tokenService,
    refreshTokenRepository,
}
