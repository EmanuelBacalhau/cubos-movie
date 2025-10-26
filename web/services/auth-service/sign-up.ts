import { httpClient } from '../httpClient';

type SignUpParams = {
	name: string;
	email: string;
	password: string;
};

export const signUp = async (params: SignUpParams) => {
	await httpClient.post('/sign-up', params);
};
