export type RefreshTokenProps = {
    id: string,
    userId: string,
    token: string,
    expiresAt: Date
};

export class RefreshToken {
    constructor(private props: RefreshTokenProps) {}

    get id(): string {
        return this.props.id;
    }

    get userId(): string {
        return this.props.userId;
    }

    get token(): string {
        return this.props.token;
    }

    get expiresAt(): Date {
        return this.props.expiresAt;
    }

    public isExpired(): boolean {
        return new Date() > this.props.expiresAt;
    }

}