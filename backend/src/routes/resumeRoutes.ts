import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resumeController";
import { generateResumeSummary } from "../controllers/resumeSummaryController";
import { generateAISummary } from "../controllers/aiSummaryController";

const router = express.Router();

// 🔥 IMPORTANT: use memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("resume"), uploadResume);
router.get("/summary/:resumeId", generateResumeSummary);
router.get("/ai-summary/:resumeId", generateAISummary);

export default router;
