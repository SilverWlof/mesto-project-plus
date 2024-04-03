import {
  UnauthExceptionCode,
} from '../constants';

class UnauthException extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = UnauthExceptionCode;
  }
}

export default UnauthException;
