import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    fromUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    toUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    body: { type: String, required: true },
    readAt: { type: Date },
  },
  { timestamps: true }
);

export type MessageDocument = InferSchemaType<typeof MessageSchema> & { _id: mongoose.Types.ObjectId };
export const Message = model<MessageDocument>('Message', MessageSchema);

