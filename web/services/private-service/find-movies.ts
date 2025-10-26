import { httpClient } from '../httpClient';
import { Movie } from '../types/movie';

type FindMoviesParams = {};

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
	const response = await httpClient.get<FindMoviesResponse>('/movies');

	return response.data;
};
