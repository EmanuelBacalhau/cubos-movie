import { ErrorCode } from '../error-code';
import { ApplicationError } from './application-error';

export class Conflict extends ApplicationError {
	public override statusCode = 409;
	public override code: ErrorCode;

	constructor(message?: string) {
		super();

		this.name = 'Conflict';
		this.code = ErrorCode.CONFLICT;
		this.message = message ?? 'Conflict';
	}
}
