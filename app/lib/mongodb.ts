import mongoose from "mongoose";

// MongoDB connection URI
const MONGO_URI = process.env.MONGODB_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Global cache for connection
let cached = global.mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("Reusing existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Establishing new MongoDB connection...");
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance;
    }).catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
