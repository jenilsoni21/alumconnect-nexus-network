import { Request, Response } from 'express';
import { Mentorship } from '../models/Mentorship.js';
import { created, ok } from '../utils/apiResponse.js';

export async function requestMentorship(req: Request, res: Response) {
  const menteeId = req.user?.id as string;
  const { mentorId, topic } = req.body as { mentorId: string; topic: string };
  const doc = await Mentorship.create({ mentorId, menteeId, topic });
  return created(res, doc);
}

export async function myMentorships(req: Request, res: Response) {
  const userId = req.user?.id as string;
  const docs = await Mentorship.find({ $or: [{ mentorId: userId }, { menteeId: userId }] }).sort({ createdAt: -1 });
  return ok(res, docs);
}

export async function respondMentorship(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const { action } = req.body as { action: 'accepted' | 'rejected' };
  const doc = await Mentorship.findByIdAndUpdate(id, { status: action }, { new: true });
  return ok(res, doc);
}

