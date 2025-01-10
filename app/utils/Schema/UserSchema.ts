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

// Check if the models are already registered, otherwise define them
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Use named exports
export default User;
