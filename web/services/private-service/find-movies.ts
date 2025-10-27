import { httpClient } from '../httpClient';
import { Movie } from '../types/movie';

export type FindMoviesParams = {
	title?: string;
	genreId?: string;
	realeseStartDate?: Date;
	realeseEndDate?: Date;
	duration?: number;
	page?: number;
};

type FindMoviesResponse = {
	items: Movie[];
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
};

export const findMovies = async (
	params: FindMoviesParams
): Promise<FindMoviesResponse> => {
	const response = await httpClient.get<FindMoviesResponse>('/movies', {
		params,
	});

	return response.data;
};
