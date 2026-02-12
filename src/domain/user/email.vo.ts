import { InternalError } from "../../application/errors";

export class Email {
    private constructor(private readonly value: string) {}

    static create(email: string): Email {
        if(!Email.isValid(email)){
            throw new InternalError("Invalid email format");
        }
        return new Email(email.toLowerCase());
    }

    private static isValid(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    getValue(): string {
        return this.value;
    }
}