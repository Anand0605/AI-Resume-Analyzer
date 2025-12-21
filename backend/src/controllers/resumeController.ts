import { Request, Response } from "express";
import Resume from "../models/Resume";
import analyzeResume from "../utils/resumeAnalyzer";
import { extractPhone } from "../utils/phoneExtractor";
import { extractEducation } from "../utils/educationExtractor";
import { analyzeSkillGap } from "../utils/skillGapAnalyzer";
import { detectResumeLevel } from "../utils/resumeLevel";

// pdf-parse v1.1.1
const pdf = require("pdf-parse");

/* ---------------- NAME EXTRACTOR ---------------- */
function extractName(text: string): string | null {
  const lines = text.split("\n").slice(0, 5);
  for (const line of lines) {
    const clean = line.trim();
    if (
      clean.length > 2 &&
      clean.length < 40 &&
      !clean.includes("@") &&
      !/\d/.test(clean)
    ) {
      return clean;
    }
  }
  return null;
}

/* ---------------- EMAIL EXTRACTOR ---------------- */
function extractEmail(text: string): string | null {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/;
  const match = text.match(regex);
  return match ? match[0] : null;
}

/* ---------------- CONTROLLER ---------------- */
export const uploadResume = async (req: Request, res: Response) => {
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
    const extractedPhone = extractPhone(text);
    const analysis = analyzeResume(text);

    // ✅ Feature 3
    const education = extractEducation(text);

    // ✅ Feature 5
    const resumeLevel = detectResumeLevel(text);

    // ✅ Feature 4 (optional JD)
    const jobDescription = req.body.jobDescription || "";
    const skillGap = jobDescription
      ? analyzeSkillGap(analysis.skills, jobDescription)
      : null;

    const resume = await Resume.create({
      name: extractedName || "Unknown",
      email: extractedEmail || "Unknown",
      phone: extractedPhone || "Not Found",
      skills: analysis.skills,
      score: analysis.score,
      education,
      resumeLevel,
      skillGap
    } as any);

    return res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
