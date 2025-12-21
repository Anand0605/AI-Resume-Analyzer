import { Request, Response } from "express";
import Resume from "../models/Resume";

// Simple AI-like summary generator
function generateSummary(resume: any) {
  const skills = resume.skills?.slice(0, 4).join(", ");
  const level = resume.resumeLevel || "professional";

  return `A ${level} developer with hands-on experience in ${skills}. 
Strong understanding of modern web technologies and a passion for building scalable applications.`;
}

export const generateResumeSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const summary = generateSummary(resume);

    return res.status(200).json({
      success: true,
      summary
    });
  } catch (error) {
    console.error("SUMMARY ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
