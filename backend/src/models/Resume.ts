import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
  score: Number,
  education: String,
  resumeLevel: String,
  skillGap: {
    matched: [String],
    missing: [String]
  }
});

export default mongoose.model("Resume", resumeSchema);
