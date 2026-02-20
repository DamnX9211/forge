import { RefreshToken } from "../../domain/auth/refresh-token.entity";
import { RefreshTokenRepository } from "../../domain/auth/refresh-token.repository";
import { db } from "../db/database";


type RefreshRow = {
    id: string;
    user_id: string;
    token: string;
    expires_at: string;

}

export class SQLiteRefreshTokenRepository implements RefreshTokenRepository {
    save(refreshToken: RefreshToken): void {
        db.prepare(`
            INSERT INTO refresh_token (id, user_id, token, expires_at)
            VALUES  (?, ?, ?, ?)
            `).run(
                refreshToken.id,
                refreshToken.userId,
                refreshToken.token,
                refreshToken.expiresAt.toISOString()
            )
    }

    find(token: string): RefreshToken | null {
        const row = db.prepare(`
            SELECT * FROM refresh_token WHERE token = ?
            `).get(token) as RefreshRow | undefined;

            if(!row) return null;

            return new RefreshToken({
                id: row.id,
                userId: row.user_id,
                token: row.token,
                expiresAt: new Date(row.expires_at)
            })


    }

    delete(token: string): void {
        db.prepare(`
            DELETE FROM refresh_token WHERE token = ?
            `).run(token);
    }

}