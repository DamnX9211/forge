import  jwt  from "jsonwebtoken";
import { TokenService } from "../../domain/auth/token-service";
import { AuthPayload } from "../../domain/auth/auth-payload";


const SECRET = "super-secret-key";

export class JwtTokenService implements TokenService {
    sign(payload: AuthPayload): string {
        return jwt.sign(payload, SECRET, { expiresIn: "15m"});
    }

    verify(token: string): AuthPayload {
         return jwt.verify(token, SECRET) as AuthPayload;
    }
}