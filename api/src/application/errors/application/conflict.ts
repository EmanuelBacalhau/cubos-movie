import { ErrorCode } from '../error-code';
import { HttpError } from '../http/http-error';

export class Conflict extends HttpError {
  public override statusCode = 409;
  public override code: ErrorCode;

  constructor(message?: string) {
    super();

    this.name = 'Conflict';
    this.code = ErrorCode.CONFLICT;
    this.message = message ?? 'Conflict';
  }
}
