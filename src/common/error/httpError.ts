import { ErrorCode } from './errorCode';
import { ErrorMessage } from './errorMessage';

export class HttpError extends Error {
  public message: ErrorMessage;

  public code: ErrorCode;
  public context?: any;

  public constructor(code: ErrorCode, message: ErrorMessage, context?: any) {
    super();
    this.code = code;
    this.message = message;
    this.context = context;
  }
}
