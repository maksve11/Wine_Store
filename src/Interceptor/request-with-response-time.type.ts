import { Request } from 'express';

export type RequestWithResponseTime = Request & {
  responseTime: number;
};