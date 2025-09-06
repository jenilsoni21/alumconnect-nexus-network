import { Request, Response } from 'express';
import { Event } from '../models/Event.js';
import { created, ok, notFound, serverError } from '../utils/apiResponse.js';

export async function createEvent(req: Request, res: Response) {
  try {
    const createdById = req.user?.id as string;
    const event = await Event.create({ ...req.body, createdById });
    return created(res, event);
  } catch (error) {
    return serverError(res, 'Failed to create event');
  }
}

export async function listEvents(_req: Request, res: Response) {
  try {
    const events = await Event.find()
      .populate('createdById', 'name role')
      .sort({ date: 1 });
    return ok(res, events);
  } catch (error) {
    return serverError(res, 'Failed to fetch events');
  }
}

export async function getEventsByCreator(req: Request, res: Response) {
  try {
    const createdById = req.user?.id as string;
    const events = await Event.find({ createdById })
      .populate('createdById', 'name role')
      .sort({ createdAt: -1 });
    return ok(res, events);
  } catch (error) {
    return serverError(res, 'Failed to fetch events');
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const createdById = req.user?.id as string;
    
    const event = await Event.findOneAndUpdate(
      { _id: id, createdById },
      req.body,
      { new: true }
    );
    
    if (!event) {
      return notFound(res, 'Event not found or you are not authorized to update it');
    }
    
    return ok(res, event);
  } catch (error) {
    return serverError(res, 'Failed to update event');
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const createdById = req.user?.id as string;
    
    const event = await Event.findOneAndDelete({ _id: id, createdById });
    
    if (!event) {
      return notFound(res, 'Event not found or you are not authorized to delete it');
    }
    
    return ok(res, { message: 'Event deleted successfully' });
  } catch (error) {
    return serverError(res, 'Failed to delete event');
  }
}

