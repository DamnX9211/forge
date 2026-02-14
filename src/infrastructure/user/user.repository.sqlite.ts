import { db } from "../db/database";
import { User } from "../../domain/user/user.entity";
import { UserRepository } from "../../domain/user/user.repository";
import { Email } from "../../domain/user/email.vo";
import { Password } from "../../domain/user/password.vo";

type UserRow = {
    id: string;
    email: string;
    password: string;
    created_at: string;
}

export class SqliteUserRepository implements UserRepository {
    save(user: User): void {
        db.prepare(`
            INSERT INTO users (id, email, password, created_at)
            VALUES (?,?,?,?)
            `).run(
                user.getId(),
                user.getEmail().getValue(),
                user.getPassword().getValue(),
                user.getCreatedAt().toISOString()
            );
    }

    findByEmail(email: string): User | null {
        const row = db.prepare(`
            SELECT * FROM users WHERE email = ?
        `).get(email) as UserRow | undefined;;

        if(!row) return null;
        
        return User.rehydrate({
            id: row.id,
            email:Email.create(row.email),
            password:Password.create(row.password),
            createdAt: new Date(row.created_at)
      }  );
    }
}