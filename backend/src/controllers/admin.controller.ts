import { Request, Response } from 'express';
import { ok } from '../utils/apiResponse.js';
import { User } from '../models/User.js';

export async function listUsers(_req: Request, res: Response) {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  return ok(res, users);
}

export async function verifyUser(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const user = await User.findByIdAndUpdate(id, { isVerified: true }, { new: true }).select('-passwordHash');
  return ok(res, user);
}

