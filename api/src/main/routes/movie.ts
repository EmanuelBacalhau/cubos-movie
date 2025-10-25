import { CreateMovieController } from '@application/controllers/movies/create-movie-controller';
import { FindMoviesController } from '@application/controllers/movies/find-movies-controller';
import { UpdateMovieController } from '@application/controllers/movies/update-movie-controller';
import { container } from '@kernel/di/container';
import { fastifyHttpPrivateAdapter } from '@main/adaptares/fastify-http-private-adapter';
import { FastifyInstance } from 'fastify';

export function registerMovieRoutes(app: FastifyInstance): void {
	app.post(
		'/movies',
		fastifyHttpPrivateAdapter(container.resolve(CreateMovieController))
	);
	app.patch(
		'/movies',
		fastifyHttpPrivateAdapter(container.resolve(UpdateMovieController))
	);
	app.get(
		'/movies',
		fastifyHttpPrivateAdapter(container.resolve(FindMoviesController))
	);
}
