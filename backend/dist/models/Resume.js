"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/* =======================
   Education Schema
======================= */
const EducationSchema = new mongoose_1.default.Schema({
    degree: { type: String, trim: true },
    year: { type: String, trim: true }
}, { _id: false });
/* =======================
   Skill Gap Schema
======================= */
const SkillGapSchema = new mongoose_1.default.Schema({
    matched: { type: [String], default: [] },
    missing: { type: [String], default: [] }
}, { _id: false });
/* =======================
   Resume Schema
======================= */
const resumeSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true // createdAt & updatedAt auto
});
exports.default = mongoose_1.default.model("Resume", resumeSchema);
