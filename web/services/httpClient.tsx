import axios from 'axios';
import { cookiesKeys } from '@/config/localstorage-keys';
import { parseCookies } from '@/lib/nookies-client';

export const httpClient = axios.create({
	baseURL: 'http://localhost:3333',
});

httpClient.interceptors.request.use(config => {
	const cookies = parseCookies();
	const storedAccessToken = cookies[cookiesKeys.AUTH_TOKEN];

	if (storedAccessToken) {
		config.headers.Authorization = `Bearer ${storedAccessToken}`;
	}

	return config;
});
