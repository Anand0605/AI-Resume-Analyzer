import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import resumeRoutes from "./routes/resumeRoutes";

connectDB();

const app = express();

// ✅ Enable CORS
app.use(cors());

// ❌ DO NOT add express.json() before multer routes
// (it can break file uploads)

// ✅ Resume upload routes (multer works here)
app.use("/api/resume", resumeRoutes);

// ✅ Health check route (optional but useful)
app.get("/test", (req, res) => {
  res.send("Server is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
