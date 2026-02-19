import { AuthPayload } from "./auth-payload";

export interface TokenService {
    sign(payload: AuthPayload): string;
    verify(token: string): AuthPayload;
}