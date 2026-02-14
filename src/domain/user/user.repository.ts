import { User } from "./user.entity";

export interface UserRepository {
    save(user: User): void;
    findByEmail(email: string): User | null;
}