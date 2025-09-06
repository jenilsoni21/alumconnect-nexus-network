import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!result.success) {
      const errors = result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    return next();
  };
}

