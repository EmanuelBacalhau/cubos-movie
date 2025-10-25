import z from 'zod';

export const signInSchema = z.object({
	email: z.email('"email" must be a valid email address'),
	password: z.string().min(8, '"password" is required'),
});

export type SignInSchema = z.infer<typeof signInSchema>;
