import {
  NotFoundErrorCode,
} from '../constants';

class NotFoundException extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = NotFoundErrorCode;
  }
}

export default NotFoundException;
