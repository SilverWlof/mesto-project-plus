import { Response, NextFunction } from 'express';
import { authRequest } from '../common/autorisedRequest';

const exceptionHandler = (
  err: { statusCode?: number; message: any; },
  req: authRequest,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
};

export default exceptionHandler;
