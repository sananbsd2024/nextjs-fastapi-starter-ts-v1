import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  city: string;
  gender: string;
}

const UserSchema: Schema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);

