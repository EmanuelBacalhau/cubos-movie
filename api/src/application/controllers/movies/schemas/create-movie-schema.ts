import z from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, '"title" is required'),
  description: z.string().min(1, '"description" is required'),
  releaseDate: z.coerce.date('"releaseDate" must be a valid date' ),
  budget: z.number().min(0, '"budget" must be a positive number'),
  banner: z.url('"banner" must be a valid URL'),
  trailerUrl: z.string('"trailerUrl" is required'),
  genreId: z.cuid('"genreId" is required'),
})

export type CreateMovieSchema = z.infer<typeof createMovieSchema>;
