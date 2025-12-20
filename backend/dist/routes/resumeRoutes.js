"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const resumeController_1 = require("../controllers/resumeController");
const router = express_1.default.Router();
// 🔥 IMPORTANT: use memoryStorage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post("/upload", upload.single("resume"), resumeController_1.uploadResume);
exports.default = router;
