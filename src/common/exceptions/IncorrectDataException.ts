import {
  IncorrectDataErrorCode,
} from '../constants';

class IncorrectDataException extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = IncorrectDataErrorCode;
  }
}

export default IncorrectDataException;
