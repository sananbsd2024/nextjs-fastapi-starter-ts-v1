import mongoose, { Schema, Document, model } from "mongoose";

interface IPost extends Document {
  title: string;
  desc: string;
  date: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Post || model<IPost>("Post", PostSchema);
