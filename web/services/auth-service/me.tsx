import { httpClient } from '../httpClient';

type GetMeResponse = {
	id: string;
	name: string;
	email: string;
};

export const me = async (): Promise<GetMeResponse> => {
	const response = await httpClient.get<GetMeResponse>('/me');

	return {
		...response.data,
	};
};
