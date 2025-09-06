import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'alumni', 'student'], default: 'student', index: true },
    headline: { type: String },
    bio: { type: String },
    avatarUrl: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export const User = model<UserDocument>('User', UserSchema);

