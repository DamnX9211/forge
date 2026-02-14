import { ValidationError } from "../../application/errors";

export class Password {
    private constructor(private readonly value: string) {}

    static create(raw: string): Password {
        if(raw.length < 8){
            throw new ValidationError("Password must be at least 8 characters long");
        
        }
        return new Password(raw);
    }
    getValue(): string {
        return this.value;
    }
}