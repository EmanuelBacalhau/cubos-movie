import { HelloController } from '@application/controllers/hello-controller';
import { container } from '@kernel/di/container';
import { fastifyHttpAdapter } from '@main/adaptares/fastify-http-adapter';
import { FastifyInstance } from 'fastify';

export function registerTestRoutes(app: FastifyInstance): void {
	app.get('/hello', fastifyHttpAdapter(container.resolve(HelloController)));
}
