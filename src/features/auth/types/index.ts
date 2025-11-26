import type { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    sub: number; // или твоя структура payload
    [key: string]: any;
  };
}
