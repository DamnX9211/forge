import { Email } from "../../domain/user/email.vo";
import { Password } from "../../domain/user/password.vo";
import { User } from "../../domain/user/user.entity";
import { randomUUID } from "node:crypto";
import { UserRepository } from "../../domain/user/user.repository";
import { ValidationError } from "../errors";
import { PasswordHasher } from "../../domain/user/password-hasher";

export type RegisterUserInput = {
    email: string;
    password: string;
};

export type RegisterUserOutput = {
    id: string;
    email: string;
    createdAt: Date;
};

export function registerUser(
    input: RegisterUserInput,
    userRepo: UserRepository,
    hasher: PasswordHasher
): RegisterUserOutput {

    const existing = userRepo.findByEmail(input.email);
    if(existing) {
        throw new ValidationError("Email already in use");
    }

    const email = Email.create(input.email);
    const validatePassword = Password.create(input.password);
    const hashedPassword = hasher.hash(validatePassword.getValue());
    const password = Password.create(hashedPassword)

    const user = User.create(randomUUID(), email, password);

    userRepo.save(user);

    return {
        id: user.getId(),
        email: user.getEmail().getValue(),
        createdAt: user.getCreatedAt(),
    }
}