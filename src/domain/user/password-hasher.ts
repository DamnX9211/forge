export interface PasswordHasher {
    hash(raw: string): string;
    compare(raw: string, hashed: string): boolean;
}