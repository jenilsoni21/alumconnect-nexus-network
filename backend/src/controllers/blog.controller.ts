import { Request, Response } from 'express';
import { Blog } from '../models/Blog.js';
import { created, ok, notFound, serverError } from '../utils/apiResponse.js';

export async function createBlog(req: Request, res: Response) {
  try {
    const authorId = req.user?.id as string;
    const { title, content, excerpt, tags, featured, status } = req.body;
    
    // Auto-generate excerpt if not provided
    const autoExcerpt = excerpt || content.substring(0, 160) + (content.length > 160 ? '...' : '');
    
    const blog = await Blog.create({ 
      authorId, 
      title, 
      content, 
      excerpt: autoExcerpt,
      tags: tags ?? [], 
      featured: featured || false,
      status: status || 'published',
      isPublished: status === 'published'
    });
    
    return created(res, blog);
  } catch (error) {
    return serverError(res, 'Failed to create blog');
  }
}

export async function listMyBlogs(req: Request, res: Response) {
  try {
    const authorId = req.user?.id as string;
    const blogs = await Blog.find({ authorId })
      .populate('authorId', 'name role')
      .sort({ createdAt: -1 });
    return ok(res, blogs);
  } catch (error) {
    return serverError(res, 'Failed to fetch blogs');
  }
}

export async function listAllBlogs(_req: Request, res: Response) {
  try {
    const blogs = await Blog.find({ 
      isPublished: true, 
      status: 'published' 
    })
      .populate('authorId', 'name role')
      .sort({ featured: -1, createdAt: -1 });
    return ok(res, blogs);
  } catch (error) {
    return serverError(res, 'Failed to fetch blogs');
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const authorId = req.user?.id as string;
    const { title, content, excerpt, tags, featured, status } = req.body;
    
    // Auto-generate excerpt if not provided
    const autoExcerpt = excerpt || content.substring(0, 160) + (content.length > 160 ? '...' : '');
    
    const blog = await Blog.findOneAndUpdate(
      { _id: id, authorId },
      { 
        title, 
        content, 
        excerpt: autoExcerpt,
        tags: tags ?? [], 
        featured: featured || false,
        status: status || 'published',
        isPublished: status === 'published'
      },
      { new: true }
    );
    
    if (!blog) {
      return notFound(res, 'Blog not found or you are not authorized to update it');
    }
    
    return ok(res, blog);
  } catch (error) {
    return serverError(res, 'Failed to update blog');
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const authorId = req.user?.id as string;
    
    const blog = await Blog.findOneAndDelete({ _id: id, authorId });
    
    if (!blog) {
      return notFound(res, 'Blog not found or you are not authorized to delete it');
    }
    
    return ok(res, { message: 'Blog deleted successfully' });
  } catch (error) {
    return serverError(res, 'Failed to delete blog');
  }
}

