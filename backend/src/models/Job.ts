import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const JobSchema = new Schema(
  {
    postedById: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    type: { type: String, enum: ['full-time', 'part-time', 'internship', 'contract'], default: 'full-time' },
    salary: { type: String },
    experience: { type: String },
    requirements: [{ type: String }],
    benefits: [{ type: String }],
    applyUrl: { type: String },
    isActive: { type: Boolean, default: true },
    status: { type: String, enum: ['active', 'draft', 'closed'], default: 'active' },
    applications: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type JobDocument = InferSchemaType<typeof JobSchema> & { _id: mongoose.Types.ObjectId };
export const Job = model<JobDocument>('Job', JobSchema);

