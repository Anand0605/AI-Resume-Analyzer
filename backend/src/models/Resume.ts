import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  score: Number
});

export default mongoose.model("Resume", resumeSchema);
