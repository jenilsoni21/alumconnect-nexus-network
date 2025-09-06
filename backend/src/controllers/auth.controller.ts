import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signJwt } from '../utils/jwt.js';
import { ok, created } from '../utils/apiResponse.js';

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body as { name: string; email: string; password: string; role?: 'admin' | 'alumni' | 'student' };
  const existing = await User.findOne({ email }).lean();
  if (existing) return res.status(409).json({ message: 'Email already registered' });
  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email, passwordHash, role: role ?? 'student' });
  const token = signJwt({ userId: user._id.toString(), role: user.role });
  return created(res, { user: sanitizeUser(user.toObject()), token });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signJwt({ userId: user._id.toString(), role: user.role });
  return ok(res, { user: sanitizeUser(user.toObject()), token });
}

export async function me(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return ok(res, sanitizeUser(user.toObject()));
}

function sanitizeUser(u: any) {
  const { passwordHash, __v, ...rest } = u;
  return rest;
}

