import  jwt  from "jsonwebtoken";
import { TokenService } from "../../domain/auth/token-service";


const SECRET = "super-secret-key";

export class JwtTokenService implements TokenService {
    sign(payload: object): string {
        return jwt.sign(payload, SECRET, { expiresIn: "15m"});
    }

    verify(token: string): object {
         return jwt.verify(token, SECRET) as object;
    }
}