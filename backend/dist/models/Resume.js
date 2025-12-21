"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EducationSchema = new mongoose_1.default.Schema({
    degree: { type: String },
    year: { type: String }
}, { _id: false } // optional but clean
);
const SkillGapSchema = new mongoose_1.default.Schema({
    matched: [String],
    missing: [String]
}, { _id: false });
const resumeSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("Resume", resumeSchema);
