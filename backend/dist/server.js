"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ⭐ MUST BE FIRST
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const resumeRoutes_1 = __importDefault(require("./routes/resumeRoutes"));
console.log("GROQ KEY:", process.env.GROQ_API_KEY);
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// ✅ Enable CORS
app.use((0, cors_1.default)());
// ❌ DO NOT add express.json() before multer routes
// (it can break file uploads)
// ✅ Resume upload routes (multer works here)
app.use("/api/resume", resumeRoutes_1.default);
// ✅ Health check route
app.get("/test", (req, res) => {
    res.send("Server is running");
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
