import { Email } from "./email.vo";
import { Password } from "./password.vo";

export type UserProps = {
    id: string;
    email: Email;
    password: Password;
    createdAt: Date;
};

export class User {
    private constructor(private props: UserProps) {}

    static create(id: string, email: Email, password: Password): User {
        return new User({
            id,
            email,
            password,
            createdAt: new Date(),
        });
    }

    getId(): string {
        return this.props.id;
    }

    getEmail(): Email {
        return this.props.email;
    }

    getCreatedAt(): Date {
        return this.props.createdAt;
    }
}