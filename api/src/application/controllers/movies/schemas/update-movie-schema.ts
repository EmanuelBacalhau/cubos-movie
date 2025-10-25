import z from 'zod';

export const updateMovieSchema = z.object({
	id: z.cuid('"id" is required'),
	title: z.string().min(1, '"title" is required').optional(),
	description: z.string().min(1, '"description" is required').optional(),
	releaseDate: z.coerce.date('"releaseDate" must be a valid date').optional(),
	budget: z.number().min(0, '"budget" must be a positive number').optional(),
	banner: z.url('"banner" must be a valid URL').optional(),
	trailerUrl: z.string('"trailerUrl" is required').optional(),
	genreId: z.cuid('"genreId" is required').optional(),
});

export type UpdateMovieSchema = z.infer<typeof updateMovieSchema>;
