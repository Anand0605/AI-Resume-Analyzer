import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resumeController";

const router = express.Router();

// 🔥 IMPORTANT: use memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("resume"), uploadResume);

export default router;
