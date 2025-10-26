import { createMovie } from './create-movie';
import { findMovieById } from './find-movie-by-id';
import { findMovies } from './find-movies';

export const privateService = {
	findMovies,
	createMovie,
	findMovieById,
};
