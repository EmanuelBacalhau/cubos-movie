import 'reflect-metadata';
import 'module-alias/register';

import fastifyJwt from '@fastify/jwt';
import { fastify } from 'fastify';
import { registerTestRoutes } from './routes/hello';

export const app = fastify();

app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
});

app.register(registerTestRoutes, { prefix: '/api' });

const PORT = Number(process.env.PORT);
app.listen({ port: PORT }).then(() => {
	console.log(`>>> Server is running on http://localhost:${PORT}`);
});
