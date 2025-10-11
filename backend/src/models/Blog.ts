import { Schema, model } from "mongoose";

interface IBlog {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true }
}, { timestamps: true });

export default model<IBlog>("Blog", BlogSchema);

