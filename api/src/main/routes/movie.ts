import { CreateMovieController } from '@application/controllers/movies/create-movie-controller';
import { container } from '@kernel/di/container';
import { fastifyHttpAdapter } from '@main/adaptares/fastify-http-adapter';
import { FastifyInstance } from 'fastify';

export function registerMovieRoutes(app: FastifyInstance): void {
	app.post('/movies', fastifyHttpAdapter(container.resolve(CreateMovieController)));
}
