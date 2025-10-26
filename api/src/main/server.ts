import 'dotenv/config';
import 'reflect-metadata';

import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { fastify } from 'fastify';
import { registerGenreRoutes } from './routes/genres';
import { registerMovieRoutes } from './routes/movies';
import { registerUserRoutes } from './routes/users';

export const fastifyServer = fastify();

fastifyServer.register(cors, {
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
});
`
`;
fastifyServer.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
});

registerUserRoutes(fastifyServer);
registerMovieRoutes(fastifyServer);
registerGenreRoutes(fastifyServer);

const PORT = Number(process.env.PORT);
fastifyServer.listen({ port: PORT }).then(() => {
	console.log(`>>> Server is running on http://localhost:${PORT}`);
});
