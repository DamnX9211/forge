import { UserRepository } from "../../domain/user/user.repository";
import { PasswordHasher } from "../../domain/user/password-hasher";
import { TokenService } from "../../domain/auth/token-service";
import { ValidationError } from "../errors";
import { RefreshTokenRepository } from "../../domain/auth/refresh-token.repository";
import { randomUUID } from "node:crypto";
import { RefreshToken } from "../../domain/auth/refresh-token.entity";


export type LoginInput = {
    email: string;
    password: string;
};

export type LoginOutput = {
    accessToken: string;
    refreshToken: string;
};

export function loginUser (
    input: LoginInput,
    userRepo: UserRepository,
    hasher: PasswordHasher,
    tokenService: TokenService,
    refreshRepo: RefreshTokenRepository
): LoginOutput {
    const user = userRepo.findByEmail(input.email);

    if (!user) {
        throw new ValidationError("Invalid email or password");
    }

    const valid = hasher.compare(
        input.password,
        user.getPassword().getValue()
    );

    if (!valid){
        throw new ValidationError("Invalid email or password");
    }

    const accessToken = tokenService.sign({ 
        userId: user.getId(),
        email: user.getEmail().getValue(),
    });

    const refreshTokenValue = randomUUID();

    const refreshToken = new RefreshToken({
        id: randomUUID(),
        userId: user.getId(),
        token: refreshTokenValue,
        expiresAt: new Date(Date.now() + 7* 24 * 60 * 60 * 1000) 
    });

    refreshRepo.save(refreshToken); 

    return {
        accessToken,
        refreshToken: refreshTokenValue,
    }
}