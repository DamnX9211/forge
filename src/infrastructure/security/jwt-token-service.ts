import  jwt  from "jsonwebtoken";
import { TokenService } from "../../domain/auth/token-service";
import { AuthPayload } from "../../domain/auth/auth-payload";


export class JwtTokenService implements TokenService {
    constructor(private readonly secret: string) {}
    
    sign(payload: AuthPayload): string {
        return jwt.sign(payload, this.secret, { expiresIn: "15m"});
    }

    verify(token: string): AuthPayload {
         return jwt.verify(token, this.secret) as AuthPayload;
    }
}