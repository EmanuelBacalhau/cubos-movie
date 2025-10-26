import { createMovie } from './create-movie';
import { deleteMovie } from './delete-movie';
import { findGenres } from './find-genres';
import { findMovieById } from './find-movie-by-id';
import { findMovies } from './find-movies';
import { updateMovie } from './update-movie';

export const privateService = {
	findMovies,
	createMovie,
	findMovieById,
	deleteMovie,
	findGenres,
	updateMovie,
};
