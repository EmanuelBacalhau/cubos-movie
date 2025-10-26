import { httpClient } from '../httpClient';

type FindGenresResponse = {
	id: string;
	name: string;
};

export const findGenres = async (): Promise<FindGenresResponse[]> => {
	const response = await httpClient.get<FindGenresResponse[]>('/genres');

	return response.data;
};
