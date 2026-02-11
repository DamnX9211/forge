export abstract class AppError extends Error {
    abstract statusCode: number;
    abstract code: string;

    constructor(message: string){
        super(message);
    }
}

export class InternalError extends AppError {
    statusCode = 500;
    code = "INTERNAL_ERROR";
}