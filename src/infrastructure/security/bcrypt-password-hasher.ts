import bcrypt from 'bcrypt';
import { PasswordHasher } from '../../domain/user/password-hasher';

export class BcryptPasswordHasher implements PasswordHasher {
    private readonly saltRounds: 10 = 10;

    hash(raw: string): string {
        return bcrypt.hashSync(raw, this.saltRounds);
    }

    compare(raw: string, hashed: string): boolean {
        return bcrypt.compareSync(raw, hashed);
    }
}