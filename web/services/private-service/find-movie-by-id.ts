import { httpClient } from '../httpClient';
import { Movie } from '../types/movie';

type FindMovieByIdParams = {
	id: string;
};

type FindMovieByIdResponse = Movie;

export const findMovieById = async (
	params: FindMovieByIdParams
): Promise<FindMovieByIdResponse> => {
	const response = await httpClient.get<FindMovieByIdResponse>(
		`/movies/${params.id}`
	);

	return response.data;
};
