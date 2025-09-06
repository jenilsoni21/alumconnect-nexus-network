import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const MentorshipSchema = new Schema(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    menteeId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    topic: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending', index: true },
  },
  { timestamps: true }
);

export type MentorshipDocument = InferSchemaType<typeof MentorshipSchema> & { _id: mongoose.Types.ObjectId };
export const Mentorship = model<MentorshipDocument>('Mentorship', MentorshipSchema);

