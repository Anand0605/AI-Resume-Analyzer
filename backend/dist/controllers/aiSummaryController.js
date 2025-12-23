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
        console.log("[AI_SUMMARY] Received request for resumeId:", resumeId);
        if (!resumeId) {
            console.error("[AI_SUMMARY] No resumeId provided");
            return res.status(400).json({ message: "resumeId is required" });
        }
        const resume = await Resume_1.default.findById(resumeId);
        if (!resume) {
            console.log("[AI_SUMMARY] Resume not found for ID:", resumeId);
            return res.status(404).json({ message: "Resume not found" });
        }
        console.log("[AI_SUMMARY] Resume found:", resume.name);
        console.log("[AI_SUMMARY] Skills:", resume.skills);
        console.log("[AI_SUMMARY] Resume Level:", resume.resumeLevel);
        if (!resume.skills || resume.skills.length === 0) {
            console.warn("[AI_SUMMARY] Warning: Resume has no skills");
        }
        const prompt = `
Generate a professional resume summary (2-3 lines).

Candidate Details:
Name: ${resume.name}
Experience Level: ${resume.resumeLevel || "Not specified"}
Skills: ${resume.skills && resume.skills.length > 0 ? resume.skills.join(", ") : "Not specified"}

Rules:
- ATS friendly
- No first-person words (I, me, my)
- Strong action verbs
- Professional tone
`;
        console.log("[AI_SUMMARY] Prompt prepared, sending to Groq...");
        console.log("[AI_SUMMARY] GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
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
        console.log("[AI_SUMMARY] Response from Groq received");
        console.log("[AI_SUMMARY] Choices length:", completion.choices.length);
        const summary = completion.choices[0]?.message?.content?.trim();
        if (!summary) {
            console.error("[AI_SUMMARY] No summary content in response");
            console.log("[AI_SUMMARY] Full response:", JSON.stringify(completion));
            return res.status(500).json({ message: "Failed to generate summary - no content returned" });
        }
        console.log("[AI_SUMMARY] Generated summary:", summary);
        // ✅ SAVE SUMMARY IN MONGODB
        resume.summary = summary;
        const savedResume = await resume.save();
        console.log("[AI_SUMMARY] Summary saved to database");
        return res.status(200).json({
            success: true,
            message: "AI summary generated & saved successfully",
            resume: {
                summary: savedResume.summary
            }
        });
    }
    catch (error) {
        console.error("[AI_SUMMARY] ERROR occurred:", error);
        console.error("[AI_SUMMARY] Error message:", error?.message);
        console.error("[AI_SUMMARY] Error stack:", error?.stack);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error?.message || String(error)
        });
    }
};
exports.generateAISummary = generateAISummary;
