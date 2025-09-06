import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const BlogSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  },
  { timestamps: true }
);

export type BlogDocument = InferSchemaType<typeof BlogSchema> & { _id: mongoose.Types.ObjectId };
export const Blog = model<BlogDocument>('Blog', BlogSchema);

