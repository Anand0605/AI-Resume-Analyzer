"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const resumeAnalyzer_1 = __importDefault(require("../utils/resumeAnalyzer"));
// ✅ Correct import for TS + CommonJS
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }
        console.log("FILE RECEIVED:", req.file.originalname);
        // ✅ pdf is a FUNCTION
        const data = await (0, pdf_parse_1.default)(req.file.buffer);
        const analysis = (0, resumeAnalyzer_1.default)(data.text);
        const resume = await Resume_1.default.create({
            name: "Unknown",
            email: "Unknown",
            skills: analysis.skills,
            score: analysis.score,
        });
        return res.status(200).json({
            success: true,
            resume,
        });
    }
    catch (error) {
        console.error("UPLOAD ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.uploadResume = uploadResume;
