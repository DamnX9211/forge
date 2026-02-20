import { RefreshToken } from "./refresh-token.entity";

export interface RefreshTokenRepository {
    save(token: RefreshToken): void;
    find(token:string): RefreshToken | null;
    delete(token: string): void;
}