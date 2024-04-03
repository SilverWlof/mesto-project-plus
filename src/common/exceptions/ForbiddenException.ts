import {
  ForbiddenExceptionCode,
} from '../constants';

class ForbiddenException extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = ForbiddenExceptionCode;
  }
}

export default ForbiddenException;
