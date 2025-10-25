import { ErrorCode } from '../error-code';
import { ApplicationError } from './application-error';

export class ResourceNotFound extends ApplicationError {
	public override statusCode = 404;
	public override code: ErrorCode;

	constructor(message?: string) {
		super();

		this.name = 'ResourceNotFound';
		this.code = ErrorCode.RESOURCE_NOT_FOUND;
		this.message = message || 'The resource was not found';
	}
}
