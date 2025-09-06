import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signJwt(payload: object) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

