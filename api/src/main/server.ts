import 'dotenv/config';
import 'reflect-metadata';

import fastifyJwt from '@fastify/jwt';
import { fastify } from 'fastify';
import { registerUserRoutes } from './routes/user';
import { registerMovieRoutes } from './routes/movie';

export const fastifyServer = fastify();

fastifyServer.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
});

registerUserRoutes(fastifyServer);
registerMovieRoutes(fastifyServer);

const PORT = Number(process.env.PORT);
fastifyServer.listen({ port: PORT }).then(() => {
	console.log(`>>> Server is running on http://localhost:${PORT}`);
});
