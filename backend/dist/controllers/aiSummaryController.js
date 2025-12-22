"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAISummary = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const groq_1 = __importDefault(require("../config/groq"));
const generateAISummary = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume_1.default.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        const prompt = `
Generate a professional resume summary (2-3 lines).

Candidate Details:
Name: ${resume.name}
Experience Level: ${resume.resumeLevel}
Skills: ${resume.skills.join(", ")}

Rules:
- ATS friendly
- No first-person words (I, me, my)
- Strong action verbs
- Professional tone
`;
        const completion = await groq_1.default.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.4,
            max_tokens: 120,
        });
        const summary = completion.choices[0]?.message?.content?.trim();
        // ✅ SAVE SUMMARY IN MONGODB
        resume.summary = summary || "";
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "AI summary generated & saved successfully",
            summary,
        });
    }
    catch (error) {
        console.error("GROQ AI SUMMARY ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.generateAISummary = generateAISummary;
