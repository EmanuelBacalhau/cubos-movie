export type Movie = {
	id: string;
	title: string;
	description: string;
	releaseDate: string;
	duration: number;
	budget: number;
	banner: string;
	trailerUrl: string;
	cover: string;
	votes: number;
	language: string;
	revenue: number;
	profit: number;
	userId: string;
	createdAt: string;
	updatedAt: string;
	genres: {
		id: string;
		name: string;
	}[];
};
