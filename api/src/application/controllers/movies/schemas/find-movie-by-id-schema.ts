import z from 'zod';

export const findMovieByIdSchema = z.object({
	id: z.cuid('"id" must be a valid cuid'),
});

export type FindMovieByIdSchema = z.infer<typeof findMovieByIdSchema>;
