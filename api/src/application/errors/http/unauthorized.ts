import { ErrorCode } from '../error-code';
import { HttpError } from './http-error';

export class Unauthorized extends HttpError {
	public override statusCode = 401;
	public override code: ErrorCode;

	constructor() {
		super();

		this.name = 'Unauthorized';
		this.code = ErrorCode.UNAUTHORIZED;
		this.message = 'Unauthorized';
	}
}
