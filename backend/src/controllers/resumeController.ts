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
export const uploadResume = async (req: Request, res: Response): Promise<any> => {
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
    const extractedPhone = extractPhone(text);
    
    console.log("[UPLOAD] Analyzing resume for skills...");
    const analysis = analyzeResume(text);

    console.log("[UPLOAD] Extracting education...");
    const education = extractEducation(text);

    console.log("[UPLOAD] Detecting resume level...");
    const resumeLevel = detectResumeLevel(text);

    const jobDescription = req.body.jobDescription || "";
    let skillGap: any = { matched: [], missing: [] };
    
    if (jobDescription) {
      const result = analyzeSkillGap(analysis.skills, jobDescription);
      if ('matched' in result && 'missing' in result) {
        skillGap = { matched: result.matched, missing: result.missing };
      } else if ('requiredSkills' in result && 'missingSkills' in result) {
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
    const resumeData: any = {
      name: extractedName || "Unknown",
      email: extractedEmail || "Unknown",
      phone: extractedPhone || "Not Found",
      skills: analysis.skills,
      score: analysis.score,
      education,
      resumeLevel,
      skillGap
    };

    const resume = await Resume.create(resumeData);
    console.log("[UPLOAD] Resume created successfully with ID:", (resume as any)._id);

    return res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error: any) {
    console.error("[UPLOAD] ERROR:", error?.message || error);
    console.error("[UPLOAD] Error stack:", error?.stack);
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error?.message || String(error)
    });
  }
};
