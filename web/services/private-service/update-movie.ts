import { httpClient } from '../httpClient';

type CreateMovieParams = Partial<{
	id: string;
	title: string;
	description: string;
	releaseDate: string;
	budget: number;
	duration: number;
	trailerUrl: string;
	genres: string[];
	votes: number;
	language: string;
	revenue: number;
	profit: number;
}>;

export const updateMovie = async (params: CreateMovieParams): Promise<void> => {
	await httpClient.patch('/movies', params);
};
