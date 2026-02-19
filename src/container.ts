import { SqliteUserRepository } from "./infrastructure/user/user.repository.sqlite";
import { BcryptPasswordHasher } from "./infrastructure/security/bcrypt-password-hasher";
import { JwtTokenService } from "./infrastructure/security/jwt-token-service";
import  { config }  from "./config";


const userRepository = new SqliteUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService(config.jwtSecret);

export const container = {
    userRepository,
    passwordHasher,
    tokenService,
}
