import { httpClient } from '../httpClient';
import { Movie } from '../types/movie';

type FindMoviesParams = {
	id: string;
};

type FindMoviesResponse = Movie;

export const findMovieById = async (
	params: FindMoviesParams
): Promise<FindMoviesResponse> => {
	const response = await httpClient.get<FindMoviesResponse>(
		`/movies/${params.id}`
	);

	return response.data;
};
