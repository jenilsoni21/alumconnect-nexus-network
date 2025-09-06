import { Request, Response } from 'express';
import { Job } from '../models/Job.js';
import { created, ok, notFound, serverError } from '../utils/apiResponse.js';

export async function postJob(req: Request, res: Response) {
  try {
    const postedById = req.user?.id as string;
    const job = await Job.create({ ...req.body, postedById });
    return created(res, job);
  } catch (error) {
    return serverError(res, 'Failed to post job');
  }
}

export async function listJobs(_req: Request, res: Response) {
  try {
    const jobs = await Job.find({ isActive: true, status: 'active' })
      .populate('postedById', 'name role')
      .sort({ createdAt: -1 });
    return ok(res, jobs);
  } catch (error) {
    return serverError(res, 'Failed to fetch jobs');
  }
}

export async function getJobsByPoster(req: Request, res: Response) {
  try {
    const postedById = req.user?.id as string;
    const jobs = await Job.find({ postedById })
      .populate('postedById', 'name role')
      .sort({ createdAt: -1 });
    return ok(res, jobs);
  } catch (error) {
    return serverError(res, 'Failed to fetch jobs');
  }
}

export async function updateJob(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const postedById = req.user?.id as string;
    
    const job = await Job.findOneAndUpdate(
      { _id: id, postedById },
      req.body,
      { new: true }
    );
    
    if (!job) {
      return notFound(res, 'Job not found or you are not authorized to update it');
    }
    
    return ok(res, job);
  } catch (error) {
    return serverError(res, 'Failed to update job');
  }
}

export async function deleteJob(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const postedById = req.user?.id as string;
    
    const job = await Job.findOneAndDelete({ _id: id, postedById });
    
    if (!job) {
      return notFound(res, 'Job not found or you are not authorized to delete it');
    }
    
    return ok(res, { message: 'Job deleted successfully' });
  } catch (error) {
    return serverError(res, 'Failed to delete job');
  }
}

