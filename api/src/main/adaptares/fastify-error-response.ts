import { ErrorCode } from '@application/errors/error-code';
import { FastifyReply } from 'fastify';

interface Params {
	statusCode: number;
	code: ErrorCode;
	message: any;
}

export function fastifyErrorResponse(reply: FastifyReply, params: Params) {
	const { statusCode, code, message } = params;

	return reply.status(statusCode).send({
		error: {
			code,
			message,
		},
	});
}
