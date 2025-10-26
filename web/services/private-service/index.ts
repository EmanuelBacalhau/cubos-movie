import { createMovie } from './create-movie';
import { deleteMovie } from './delete-movie';
import { findMovieById } from './find-movie-by-id';
import { findMovies } from './find-movies';

export const privateService = {
	findMovies,
	createMovie,
	findMovieById,
	deleteMovie,
};
