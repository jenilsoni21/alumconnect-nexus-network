import { getIO } from '../realtime/io.js';

export function notifyUser(userId: string, event: string, payload: unknown) {
  try {
    getIO().to(`user:${userId}`).emit(event, payload);
  } catch {
    // no-op if io not ready
  }
}

