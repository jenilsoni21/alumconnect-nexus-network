import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String },
    type: { type: String, enum: ['Virtual', 'In-Person', 'Hybrid'], default: 'In-Person' },
    category: { type: String, enum: ['Career Development', 'Networking', 'Technical Workshop', 'Entrepreneurship', 'Social'], default: 'Networking' },
    maxAttendees: { type: Number, default: 100 },
    attendees: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    speakers: [{ type: String }],
    organizer: { type: String },
    status: { type: String, enum: ['upcoming', 'past', 'draft'], default: 'upcoming' },
    createdById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export type EventDocument = InferSchemaType<typeof EventSchema> & { _id: mongoose.Types.ObjectId };
export const Event = model<EventDocument>('Event', EventSchema);

