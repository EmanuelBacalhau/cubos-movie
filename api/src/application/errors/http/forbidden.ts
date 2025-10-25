import { ErrorCode } from '../error-code';
import { HttpError } from './http-error';

export class Forbidden extends HttpError {
	public override statusCode = 403;
	public override code: ErrorCode;

	constructor() {
		super();

		this.name = 'Forbidden';
		this.code = ErrorCode.FORBIDDEN;
		this.message = 'Forbidden';
	}
}
