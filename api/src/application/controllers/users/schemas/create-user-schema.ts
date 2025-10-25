import z from 'zod';

export const createUserSchema = z.object({
	name: z.string().min(1, '"name" is required'),
	email: z.email('"email" must be a valid email address'),
	password: z.string().min(8, '"password" must be at least 8 characters long'),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
