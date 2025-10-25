import { Movie } from '@application/entities/movie';

export interface SearchMovieParams {
	title?: string;
	genderId?: string;
	realeseStartDate?: Date;
	realeseEndDate?: Date;
	duration?: number;
	page?: number;
	perPage?: number;
}

export interface IMovieRepository {
	create(data: Movie.CreateInput): Promise<Movie>;
	findById(id: string): Promise<Movie | null>;
	findByTitle(title: string): Promise<Movie | null>;
	find(props: SearchMovieParams): Promise<Movie[]>;
	update(movie: Movie.UpdateInput): Promise<void>;
	delete(id: string): Promise<void>;
	count(): Promise<number>;
}
