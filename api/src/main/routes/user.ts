import { CreateUserController } from '@application/controllers/users/create-user-controller';
import { SignInController } from '@application/controllers/users/sign-in-controller';
import { container } from '@kernel/di/container';
import { fastifyHttpAdapter } from '@main/adaptares/fastify-http-adapter';
import { FastifyInstance } from 'fastify';

export function registerTestRoutes(app: FastifyInstance): void {
	app.post('/sign-up', fastifyHttpAdapter(container.resolve(CreateUserController)));
	app.post('/sign-in', fastifyHttpAdapter(container.resolve(SignInController)));
}
