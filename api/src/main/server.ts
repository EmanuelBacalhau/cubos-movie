import 'dotenv/config';
import 'reflect-metadata';

import fastifyJwt from '@fastify/jwt';
import { fastify } from 'fastify';
import { registerTestRoutes } from './routes/user';

export const fastifyServer = fastify();

fastifyServer.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
});

registerTestRoutes(fastifyServer);

const PORT = Number(process.env.PORT);
fastifyServer.listen({ port: PORT }).then(() => {
	console.log(`>>> Server is running on http://localhost:${PORT}`);
});
