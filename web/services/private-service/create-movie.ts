import { httpClient } from '../httpClient';

type CreateMovieParams = {
	title: string;
	description: string;
	releaseDate: string;
	budget: number;
	duration: number;
	trailerUrl: string;
	genres: string[];
	fileBanner: {
		size: number;
		inputType: string;
	};
	fileCover: {
		size: number;
		inputType: string;
	};
	votes: number;
	language: string;
	revenue: number;
	profit: number;
};

type CreateMovieResulst = {
	uploadBannerSignature: {
		fields: any;
		url: string;
	};
	uploadCoverSignature: {
		fields: any;
		url: string;
	};
};

export const createMovie = async (
	params: CreateMovieParams
): Promise<CreateMovieResulst> => {
	const response = await httpClient.post('/movies', params);

	const { uploadBannerSignature, uploadCoverSignature } = response.data;

	const bannerJson = Buffer.from(uploadBannerSignature, 'base64').toString(
		'utf-8'
	);
	const coverJson = Buffer.from(uploadCoverSignature, 'base64').toString(
		'utf-8'
	);

	const bannerObj = JSON.parse(bannerJson);
	const coverObj = JSON.parse(coverJson);

	return {
		uploadBannerSignature: bannerObj,
		uploadCoverSignature: coverObj,
	};
};
