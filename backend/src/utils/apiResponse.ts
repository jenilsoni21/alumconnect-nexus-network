import { Response } from 'express';

export function ok<T>(res: Response, data: T) {
  return res.json({ data });
}

export function created<T>(res: Response, data: T) {
  return res.status(201).json({ data });
}

export function notFound(res: Response, message: string) {
  return res.status(404).json({ error: message });
}

export function serverError(res: Response, message: string) {
  return res.status(500).json({ error: message });
}

