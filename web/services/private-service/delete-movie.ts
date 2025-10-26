import { httpClient } from '../httpClient';

type DeleteMovieParams = {
	id: string;
};

export const deleteMovie = async (params: DeleteMovieParams): Promise<void> => {
	await httpClient.delete(`/movies/${params.id}`);
};
