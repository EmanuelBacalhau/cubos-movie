import { CreateUserController } from '@application/controllers/users/create-user-controller';
import { GetMeController } from '@application/controllers/users/get-me-controller';
import { SignInController } from '@application/controllers/users/sign-in-controller';
import { container } from '@kernel/di/container';
import { fastifyHttpPrivateAdapter } from '@main/adaptares/fastify-http-private-adapter';
import { fastifyHttpPublicAdapter } from '@main/adaptares/fastify-http-public-adapter';
import { FastifyInstance } from 'fastify';

export function registerUserRoutes(app: FastifyInstance): void {
	app.post(
		'/sign-up',
		fastifyHttpPublicAdapter(container.resolve(CreateUserController))
	);
	app.post(
		'/sign-in',
		fastifyHttpPublicAdapter(container.resolve(SignInController))
	);
	app.get('/me', fastifyHttpPrivateAdapter(container.resolve(GetMeController)));
}
