import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

export function createApp(): Application {
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan('dev'));

  const limiter = rateLimit({ windowMs: 60_000, max: 100 });
  app.use(limiter);

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'alumnet-backend' });
  });

  app.use('/api', routes);

  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}

