import { Request, Response } from 'express';
import { Message } from '../models/Message.js';
import { created, ok } from '../utils/apiResponse.js';
import { notifyUser } from '../services/notification.service.js';

export async function sendMessage(req: Request, res: Response) {
  const fromUserId = req.user?.id as string;
  const { toUserId, body } = req.body as { toUserId: string; body: string };
  const msg = await Message.create({ fromUserId, toUserId, body });
  notifyUser(toUserId, 'message:new', { fromUserId, body, id: msg._id });
  return created(res, msg);
}

export async function thread(req: Request, res: Response) {
  const me = req.user?.id as string;
  const other = req.params.userId as string;
  const messages = await Message.find({
    $or: [
      { fromUserId: me, toUserId: other },
      { fromUserId: other, toUserId: me },
    ],
  }).sort({ createdAt: 1 });
  return ok(res, messages);
}

