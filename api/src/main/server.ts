import 'dotenv/config';
// import 'module-alias/register';
import 'reflect-metadata';

import fastifyJwt from '@fastify/jwt';
import { fastify } from 'fastify';
import { registerTestRoutes } from './routes/user';

export const app = fastify();

app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
});

registerTestRoutes(app);

const PORT = Number(process.env.PORT);
app.listen({ port: PORT }).then(() => {
	console.log(`>>> Server is running on http://localhost:${PORT}`);
});
