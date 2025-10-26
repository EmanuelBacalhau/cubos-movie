import z from 'zod';

export const createMovieSchema = z.object({
	title: z.string().min(1, '"title" is required'),
	description: z.string().min(1, '"description" is required'),
	releaseDate: z.coerce.date('"releaseDate" must be a valid date'),
	budget: z.number().min(0, '"budget" must be a positive number'),
	duration: z.number().min(1, '"duration" must be at least 1 minute'),
	trailerUrl: z.string('"trailerUrl" is required'),
	genres: z.array(z.cuid(), '"genres" is required'),
	votes: z.number().min(0, '"votes" must be a positive number'),
	language: z.string().min(1, '"language" is required'),
	revenue: z.number().min(0, '"revenue" must be a positive number'),
	profit: z.number().min(0, '"profit" must be a positive number'),
	fileBanner: z.object({
		size: z.number().min(1, '"fileBanner.size" must be at least 1 byte'),
		inputType: z.string().min(1, '"fileBanner.inputType" is required'),
	}),
	fileCover: z.object({
		size: z.number().min(1, '"fileCover.size" must be at least 1 byte'),
		inputType: z.string().min(1, '"fileCover.inputType" is required'),
	}),
});

export type CreateMovieSchema = z.infer<typeof createMovieSchema>;
