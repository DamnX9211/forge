import { z } from 'zod';

export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type RegisterRequestDTO = z.infer<typeof registerUserSchema>;

export type RegisterResponseDTO = {
    id: string;
    email: string;
    createdAt: string;
}