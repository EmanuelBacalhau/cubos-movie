import { Controller } from '@application/contracts/http/controller';
import { ApplicationError } from '@application/errors/application/application-error';
import { ErrorCode } from '@application/errors/error-code';
import { HttpError } from '@application/errors/http/http-error';
import { Unauthorized } from '@application/errors/http/unauthorized';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { fastifyErrorResponse } from './fastify-error-response';

export function fastifyHttpAdapter(controllerImp: Controller<any, unknown>) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const body = request.body as Record<string, unknown>;
			const params = request.params as Record<string, unknown>;
			const queryParams = request.query as Record<string, unknown>;

			let accountId = null;
			if (request.headers.authorization) {
				try {
					await request.jwtVerify();
				} catch {
					throw new Unauthorized();
				}
				accountId = (request.user as unknown as any).sub;
			}

			const response = await controllerImp.execute({
				body,
				params,
				queryParams,
				accountId,
			});

			return reply
				.status(response.statusCode)
				.send(response.body ? response.body : undefined);
		} catch (error) {
			console.error(error);

			if (error instanceof ZodError) {
				return fastifyErrorResponse(reply, {
					statusCode: 400,
					code: ErrorCode.VALIDATION,
					message: error.issues.map(issue => ({
						field: issue.path.join('.'),
						message: issue.message,
					})),
				});
			}

			if (error instanceof ApplicationError) {
				return fastifyErrorResponse(reply, {
					statusCode: error.statusCode ?? 400,
					code: error.code,
					message: error.message,
				});
			}

			if (error instanceof HttpError) {
				return fastifyErrorResponse(reply, {
					statusCode: error.statusCode,
					code: error.code,
					message: error.message,
				});
			}

			return fastifyErrorResponse(reply, {
				statusCode: 500,
				code: ErrorCode.INTERNAL_SERVER_ERROR,
				message: 'Internal server error',
			});
		}
	};
}
