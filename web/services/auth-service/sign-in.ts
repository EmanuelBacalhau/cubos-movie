import { httpClient } from '../httpClient';

type SignInParams = {
	email: string;
	password: string;
};

type SignInResponse = {
	token: string;
};

export const signIn = async (params: SignInParams): Promise<SignInResponse> => {
	const response = await httpClient.post<SignInResponse>('/sign-in', params);
	const token = response.data.token;

	return {
		token,
	};
};
