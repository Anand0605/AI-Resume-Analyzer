"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResumeSummary = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
// Simple AI-like summary generator
function generateSummary(resume) {
    const skills = resume.skills?.slice(0, 4).join(", ");
    const level = resume.resumeLevel || "professional";
    return `A ${level} developer with hands-on experience in ${skills}. 
Strong understanding of modern web technologies and a passion for building scalable applications.`;
}
const generateResumeSummary = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume_1.default.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        const summary = generateSummary(resume);
        return res.status(200).json({
            success: true,
            summary
        });
    }
    catch (error) {
        console.error("SUMMARY ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.generateResumeSummary = generateResumeSummary;
