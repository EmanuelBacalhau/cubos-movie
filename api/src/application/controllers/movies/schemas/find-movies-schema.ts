import z from 'zod';

export const findMoviesSchema = z.object({
	title: z.string().min(1, '"title" must be at least 1 character').optional(),
	genreId: z.cuid('"genderId" must be a valid cuid').optional(),
	realeseStartDate: z.coerce
		.date('"realeseDate" must be a valid date')
		.optional(),
	realeseEndDate: z.coerce
		.date('"realeseDate" must be a valid date')
		.optional(),
	duration: z
		.number()
		.min(1, '"duration" must be at least 1 minute')
		.optional(),
	page: z.coerce.number().min(1, '"page" must be at least 1').optional(),
});

export type FindMoviesSchema = z.infer<typeof findMoviesSchema>;
