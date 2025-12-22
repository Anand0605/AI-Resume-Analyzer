import { Request, Response } from "express";
import Resume from "../models/Resume";
import groq from "../config/groq";

export const generateAISummary = async (req: Request, res: Response) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

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

    const completion = await groq.chat.completions.create({
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
  } catch (error) {
    console.error("GROQ AI SUMMARY ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
