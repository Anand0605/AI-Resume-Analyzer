import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/ai_resume");
  console.log("MongoDB Connected");
};
export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("MongoDB Disconnected");
}