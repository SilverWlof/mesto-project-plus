import { Request } from 'express';

export interface authRequest extends Request {
  user?: {
    _id: string;
  }
}
