import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export function notFoundHandler(_req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function globalErrorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message ?? getReasonPhrase(status);
  res.status(status).json({ message });
}

