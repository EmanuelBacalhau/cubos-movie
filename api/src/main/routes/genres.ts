import { FindGenresController } from '@application/controllers/genre/find-genres-controller';
import { container } from '@kernel/di/container';
import { fastifyHttpPrivateAdapter } from '@main/adaptares/fastify-http-private-adapter';
import { FastifyInstance } from 'fastify';

export function registerGenreRoutes(app: FastifyInstance): void {
	app.get(
		'/genres',
		fastifyHttpPrivateAdapter(container.resolve(FindGenresController))
	);
}
