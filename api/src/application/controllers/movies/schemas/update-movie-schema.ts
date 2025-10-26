import z from 'zod';

export const updateMovieSchema = z.object({
	id: z.cuid('"id" is required'),
	title: z.string().min(1, '"title" is required').optional(),
	description: z.string().min(1, '"description" is required').optional(),
	releaseDate: z.coerce.date('"releaseDate" must be a valid date').optional(),
	budget: z.number().min(0, '"budget" must be a positive number').optional(),
	banner: z.url('"banner" must be a valid URL').optional(),
	trailerUrl: z.string('"trailerUrl" is required').optional(),
	genres: z.array(z.cuid()).optional(),
	votes: z.number().min(0, '"votes" must be a positive number').optional(),
	language: z.string().min(1, '"language" is required').optional(),
	revenue: z.number().min(0, '"revenue" must be a positive number').optional(),
	profit: z.number().min(0, '"profit" must be a positive number').optional(),
	fileBanner: z.object({
		size: z
			.number()
			.min(1, '"fileBanner.size" must be at least 1 byte')
			.optional(),
		inputType: z
			.string()
			.min(1, '"fileBanner.inputType" is required')
			.optional(),
	}),
	fileCover: z.object({
		size: z
			.number()
			.min(1, '"fileCover.size" must be at least 1 byte')
			.optional(),
		inputType: z
			.string()
			.min(1, '"fileCover.inputType" is required')
			.optional(),
	}),
	originalTitle: z.string().min(1, '"originalTitle" is required').optional(),
	rating: z.string().min(1, '"rating" is required').optional(),
});

export type UpdateMovieSchema = z.infer<typeof updateMovieSchema>;
