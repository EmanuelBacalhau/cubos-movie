import { ErrorCode } from '../error-code';
import { HttpError } from './http-error';

export class BadRequest extends HttpError {
	public override statusCode = 400;
	public override code: ErrorCode;

	constructor(message?: any, code?: ErrorCode) {
		super();

		this.name = 'BadRequest';
		this.code = code ?? ErrorCode.BAD_REQUEST;
		this.message = message ?? 'Bad Request';
	}
}
