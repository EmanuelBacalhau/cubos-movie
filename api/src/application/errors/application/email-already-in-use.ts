import { ErrorCode } from '../error-code';
import { ApplicationError } from './application-error';

export class EmailAlreadyInUse extends ApplicationError {
	public override statusCode = 409;
	public override code: ErrorCode;

	constructor() {
		super();

		this.name = 'EmailAlreadyInUse';
		this.code = ErrorCode.EMAIL_ALREADY_IN_USE;
		this.message = 'This email is already in use';
	}
}
