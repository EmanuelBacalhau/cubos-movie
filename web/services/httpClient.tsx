import axios from 'axios';
import { localStorageKeys } from '@/config/localstorage-keys';

export const httpClient = axios.create({
	baseURL: 'http://localhost:3333',
});

httpClient.interceptors.request.use(config => {
	const storedAccessToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);

	if (storedAccessToken) {
		config.headers.Authorization = `Bearer ${storedAccessToken}`;
	}

	return config;
});
