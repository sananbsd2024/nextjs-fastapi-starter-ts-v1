import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
