import { CreateUserController } from '@application/controllers/users/hello-controller';
import { container } from '@kernel/di/container';
import { fastifyHttpAdapter } from '@main/adaptares/fastify-http-adapter';
import { FastifyInstance } from 'fastify';

export function registerTestRoutes(app: FastifyInstance): void {
	app.post('/users', fastifyHttpAdapter(container.resolve(CreateUserController)));
}
