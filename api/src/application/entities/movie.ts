import { Genre } from './genre';

export class Movie {
	id: string;
	title: string;
	description: string;
	releaseDate: Date;
	budget: number;
	duration: number;
	cover: string;
	votes: number;
	language: string;
	revenue: number;
	profit: number;
	banner: string;
	trailerUrl: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	genres: string[];
	originalTitle: string;
	rating: number;

	constructor(props: Movie.CreateAttributes, id?: string) {
		this.id = id ?? '';
		this.title = props.title;
		this.description = props.description;
		this.releaseDate = props.releaseDate;
		this.duration = props.duration;
		this.budget = props.budget;
		this.banner = props.banner;
		this.trailerUrl = props.trailerUrl;
		this.userId = props.userId;
		this.createdAt = props.createdAt || new Date();
		this.updatedAt = props.updatedAt || new Date();
		this.cover = props.cover;
		this.votes = props.votes;
		this.language = props.language;
		this.revenue = props.revenue;
		this.profit = props.profit;
		this.genres = props.genres || [];
		this.originalTitle = props.originalTitle;
		this.rating = props.rating;
	}
}

export namespace Movie {
	export type CreateAttributes = {
		title: string;
		description: string;
		releaseDate: Date;
		budget: number;
		banner: string;
		cover: string;
		votes: number;
		language: string;
		revenue: number;
		profit: number;
		trailerUrl: string;
		duration: number;
		userId: string;
		createdAt?: Date;
		updatedAt?: Date;
		genres?: string[];
		originalTitle: string;
		rating: number;
	};

	export type Attributes = {
		id: string;
		title: string;
		description: string;
		releaseDate: Date;
		budget: number;
		banner: string;
		duration: number;
		trailerUrl: string;
		cover: string;
		votes: number;
		language: string;
		revenue: number;
		profit: number;
		userId: string;
		createdAt: Date;
		updatedAt: Date;
		genres: Genre[];
		originalTitle: string;
		rating: number;
	};

	export type CreateInput = {
		title: string;
		cover: string;
		votes: number;
		language: string;
		revenue: number;
		profit: number;
		description: string;
		releaseDate: Date;
		budget: number;
		banner: string;
		duration: number;
		trailerUrl: string;
		userId: string;
		genres: string[];
		originalTitle: string;
		rating: number;
	};

	export type UpdateInput = {
		title?: string;
		votes?: number;
		language?: string;
		revenue?: number;
		profit?: number;
		description?: string;
		releaseDate?: Date;
		budget?: number;
		duration?: number;
		trailerUrl?: string;
		genres?: string[];
		originalTitle?: string;
		rating?: number;
	};
}
