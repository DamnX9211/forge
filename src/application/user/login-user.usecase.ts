import { UserRepository } from "../../domain/user/user.repository";
import { PasswordHasher } from "../../domain/user/password-hasher";
import { TokenService } from "../../domain/auth/token-service";
import { ValidationError } from "../errors";

export type LoginInput = {
    email: string;
    password: string;
};

export type LoginOutput = {
    accessToken: string;
};

export function loginUser (
    input: LoginInput,
    userRepo: UserRepository,
    hasher: PasswordHasher,
    tokenService: TokenService
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

    const token = tokenService.sign({ 
        userId: user.getId(),
        email: user.getEmail().getValue(),
    });

    return { accessToken: token};
}