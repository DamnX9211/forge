export type RegisterRequestDTO = {
    email: string;
    password: string;
};

export type RegisterResponseDTO = {
    id: string;
    email: string;
    createdAt: string;
}