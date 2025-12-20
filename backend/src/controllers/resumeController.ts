import { Request, Response } from "express";
import Resume from "../models/Resume";
import analyzeResume from "../utils/resumeAnalyzer";

// ✅ Correct import for TS + CommonJS
import pdf from "pdf-parse";

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    console.log("FILE RECEIVED:", req.file.originalname);

    // ✅ pdf is a FUNCTION
    const data = await pdf(req.file.buffer);

    const analysis = analyzeResume(data.text);

    const resume = await Resume.create({
      name: "Unknown",
      email: "Unknown",
      skills: analysis.skills,
      score: analysis.score,
    });

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
