import mongoose from "mongoose";

export async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required. Copy backend/.env.example to backend/.env and configure MongoDB.");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}
