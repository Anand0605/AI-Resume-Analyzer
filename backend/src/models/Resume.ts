import mongoose from "mongoose";

/* =======================
   Education Schema
======================= */
const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String, trim: true },
    year: { type: String, trim: true }
  },
  { _id: false }
);

/* =======================
   Skill Gap Schema
======================= */
const SkillGapSchema = new mongoose.Schema(
  {
    matched: { type: [String], default: [] },
    missing: { type: [String], default: [] }
  },
  { _id: false }
);

/* =======================
   Resume Schema
======================= */
const resumeSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },

    skills: { type: [String], default: [] },
    score: { type: Number, default: 0 },

    education: {
      type: [EducationSchema],
      default: []
    },

    resumeLevel: { type: String, trim: true },

    /* 🔥 AI Generated Summary */
    summary: {
      type: String,
      default: ""
    },

    skillGap: {
      type: SkillGapSchema,
      default: { matched: [], missing: [] }
    }
  },
  {
    timestamps: true // createdAt & updatedAt auto
  }
);

export default mongoose.model("Resume", resumeSchema);
