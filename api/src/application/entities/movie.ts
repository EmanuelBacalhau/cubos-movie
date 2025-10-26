export class Movie {
	id: string;
	title: string;
	description: string;
	releaseDate: Date;
	budget: number;
	duration: number;
	banner: string;
	trailerUrl: string;
	userId: string;
	genreId: string;
	createdAt: Date;
	updatedAt: Date;

	genreStr: string;

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
		this.genreId = props.genreId;
		this.createdAt = props.createdAt || new Date();
		this.updatedAt = props.updatedAt || new Date();
		this.genreStr = props.genre || '';
	}
}

export namespace Movie {
	export type CreateAttributes = {
		title: string;
		description: string;
		releaseDate: Date;
		budget: number;
		banner: string;
		trailerUrl: string;
		duration: number;
		userId: string;
		genreId: string;
		createdAt?: Date;
		updatedAt?: Date;
		genre?: string;
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
		userId: string;
		genreId: string;
		createdAt: Date;
		updatedAt: Date;
	};

	export type CreateInput = {
		title: string;
		description: string;
		releaseDate: Date;
		budget: number;
		banner: string;
		duration: number;
		trailerUrl: string;
		userId: string;
		genreId: string;
	};

	export type UpdateInput = {
		title?: string;
		description?: string;
		releaseDate?: Date;
		budget?: number;
		banner?: string;
		duration?: number;
		trailerUrl?: string;
		genreId?: string;
	};
}
