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
            console.error("[UPLOAD] No file received");
            return res.status(400).json({ message: "Resume file is required" });
        }
        console.log("[UPLOAD] FILE RECEIVED:", req.file.originalname);
        console.log("[UPLOAD] File size:", req.file.size, "bytes");
        // Parse PDF
        console.log("[UPLOAD] Parsing PDF...");
        const data = await pdf(req.file.buffer);
        const text = data.text;
        if (!text) {
            console.error("[UPLOAD] PDF text extraction failed");
            return res.status(400).json({ message: "Unable to read PDF text" });
        }
        console.log("[UPLOAD] PDF parsed successfully, text length:", text.length);
        console.log("[UPLOAD] First 500 chars:", text.substring(0, 500));
        // Extract information
        console.log("[UPLOAD] Extracting name, email, phone...");
        const extractedName = extractName(text);
        const extractedEmail = extractEmail(text);
        const extractedPhone = (0, phoneExtractor_1.extractPhone)(text);
        console.log("[UPLOAD] Analyzing resume for skills...");
        const analysis = (0, resumeAnalyzer_1.default)(text);
        console.log("[UPLOAD] Extracting education...");
        const education = (0, educationExtractor_1.extractEducation)(text);
        console.log("[UPLOAD] Detecting resume level...");
        const resumeLevel = (0, resumeLevel_1.detectResumeLevel)(text);
        const jobDescription = req.body.jobDescription || "";
        let skillGap = { matched: [], missing: [] };
        if (jobDescription) {
            const result = (0, skillGapAnalyzer_1.analyzeSkillGap)(analysis.skills, jobDescription);
            if ('matched' in result && 'missing' in result) {
                skillGap = { matched: result.matched, missing: result.missing };
            }
            else if ('requiredSkills' in result && 'missingSkills' in result) {
                skillGap = { matched: result.requiredSkills, missing: result.missingSkills };
            }
        }
        console.log("[UPLOAD] [FINAL_DATA]", {
            name: extractedName,
            email: extractedEmail,
            phone: extractedPhone,
            skills: analysis.skills,
            score: analysis.score,
            resumeLevel,
            educationCount: education.length,
        });
        console.log("[UPLOAD] Creating resume in database...");
        const resumeData = {
            name: extractedName || "Unknown",
            email: extractedEmail || "Unknown",
            phone: extractedPhone || "Not Found",
            skills: analysis.skills,
            score: analysis.score,
            education,
            resumeLevel,
            skillGap
        };
        const resume = await Resume_1.default.create(resumeData);
        console.log("[UPLOAD] Resume created successfully with ID:", resume._id);
        return res.status(200).json({
            success: true,
            data: resume
        });
    }
    catch (error) {
        console.error("[UPLOAD] ERROR:", error?.message || error);
        console.error("[UPLOAD] Error stack:", error?.stack);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error?.message || String(error)
        });
    }
};
exports.uploadResume = uploadResume;
