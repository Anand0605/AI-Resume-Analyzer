import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String },
    year: { type: String }
  },
  { _id: false } // optional but clean
);

const SkillGapSchema = new mongoose.Schema(
  {
    matched: [String],
    missing: [String]
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,

  skills: [String],
  score: Number,

  // ✅ FIX HERE
  education: [EducationSchema],

  resumeLevel: String,

  skillGap: SkillGapSchema,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Resume", resumeSchema);
