import z from 'zod';

export const deleteMovieSchema = z.object({
	id: z.cuid('"id" is required'),
});

export type DeleteMovieSchema = z.infer<typeof deleteMovieSchema>;
