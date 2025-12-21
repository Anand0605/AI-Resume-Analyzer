"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const resumeAnalyzer_1 = __importDefault(require("../utils/resumeAnalyzer"));
const phoneExtractor_1 = require("../utils/phoneExtractor");
const educationExtractor_1 = require("../utils/educationExtractor");
const skillGapAnalyzer_1 = require("../utils/skillGapAnalyzer");
const resumeLevel_1 = require("../utils/resumeLevel");
// pdf-parse v1.1.1
const pdf = require("pdf-parse");
/* ---------------- NAME EXTRACTOR ---------------- */
function extractName(text) {
    const lines = text.split("\n").slice(0, 5);
    for (const line of lines) {
        const clean = line.trim();
        if (clean.length > 2 &&
            clean.length < 40 &&
            !clean.includes("@") &&
            !/\d/.test(clean)) {
            return clean;
        }
    }
    return null;
}
/* ---------------- EMAIL EXTRACTOR ---------------- */
function extractEmail(text) {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/;
    const match = text.match(regex);
    return match ? match[0] : null;
}
/* ---------------- CONTROLLER ---------------- */
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }
        console.log("FILE RECEIVED:", req.file.originalname);
        const data = await pdf(req.file.buffer);
        const text = data.text;
        if (!text) {
            return res.status(400).json({ message: "Unable to read PDF text" });
        }
        // Existing features (UNCHANGED)
        const extractedName = extractName(text);
        const extractedEmail = extractEmail(text);
        const extractedPhone = (0, phoneExtractor_1.extractPhone)(text);
        const analysis = (0, resumeAnalyzer_1.default)(text);
        // ✅ Feature 3
        const education = (0, educationExtractor_1.extractEducation)(text);
        // ✅ Feature 5
        const resumeLevel = (0, resumeLevel_1.detectResumeLevel)(text);
        // ✅ Feature 4 (optional JD)
        const jobDescription = req.body.jobDescription || "";
        const skillGap = jobDescription
            ? (0, skillGapAnalyzer_1.analyzeSkillGap)(analysis.skills, jobDescription)
            : null;
        const resume = await Resume_1.default.create({
            name: extractedName || "Unknown",
            email: extractedEmail || "Unknown",
            phone: extractedPhone || "Not Found",
            skills: analysis.skills,
            score: analysis.score,
            education,
            resumeLevel,
            skillGap
        });
        return res.status(200).json({
            success: true,
            data: resume
        });
    }
    catch (error) {
        console.error("UPLOAD ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.uploadResume = uploadResume;
