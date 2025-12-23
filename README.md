# AI Resume Analyzer

A full-stack application that analyzes resumes using AI, extracting key information, detecting experience levels, and generating ATS-friendly summaries.

## 🌟 Features

- **PDF Resume Parsing**: Extract text and structured data from PDF resumes
- **Contact Information Extraction**: Automatically extract name, email, and phone number
- **Skill Detection**: Identify technical skills with keyword-based analysis and experience level detection
- **AI-Powered Summaries**: Generate professional, ATS-friendly resume summaries using Groq LLM
- **Education Extraction**: Parse degree and graduation year information
- **Skill Gap Analysis**: Match candidate skills against job requirements
- **Resume Scoring**: Calculate resume strength based on detected skills (0-100 scale)
- **MongoDB Storage**: Persistent storage for all resume data and analysis

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **PDF Processing**: pdf-parse 1.1.1
- **AI/LLM**: Groq SDK (llama-3.1-8b-instant model)
- **File Handling**: Multer (memory storage)
- **CORS**: Enabled for frontend integration

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7.x
- **Styling**: Tailwind CSS 4.x
- **Dev Server**: HMR (Hot Module Replacement) enabled

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB running locally (`mongodb://127.0.0.1:27017`)
- Groq API key (get one at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AI-Resume-Analyzer
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

### Configuration

Create a `.env` file in the `backend` directory:
```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# MongoDB Configuration (optional, defaults to local)
MONGODB_URI=mongodb://127.0.0.1:27017/ai_resume

# Server Configuration (optional)
PORT=5000
NODE_ENV=development
```

**⚠️ Important**: Never commit `.env` file to version control. See `.gitignore` for exclusions.

## 💻 Development

### Backend Development
```bash
cd backend
npm run dev          # Start with hot-reload (ts-node-dev)
npm run build        # Compile TypeScript to dist/
npm start            # Run compiled JavaScript
```

Backend runs on `http://localhost:5000`

### Frontend Development
```bash
cd frontend
npm run dev          # Start Vite dev server with HMR
npm run build        # Build for production
npm run lint         # Check ESLint rules
npm run preview      # Preview production build
```

Frontend runs on `http://localhost:5173` (default Vite port)

### Health Check
Test backend connectivity:
```bash
curl http://localhost:5000/test
# Expected response: "Server is running"
```

## 📁 Project Structure

```
AI-Resume-Analyzer/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts              # MongoDB connection
│   │   │   └── groq.ts            # Groq LLM client
│   │   ├── controllers/
│   │   │   ├── resumeController.ts
│   │   │   ├── aiSummaryController.ts
│   │   │   └── resumeSummaryController.ts
│   │   ├── models/
│   │   │   └── Resume.ts          # Mongoose schema
│   │   ├── routes/
│   │   │   └── resumeRoutes.ts
│   │   ├── utils/
│   │   │   ├── resumeAnalyzer.ts
│   │   │   ├── resumeLevel.ts
│   │   │   ├── educationExtractor.ts
│   │   │   ├── skillGapAnalyzer.ts
│   │   │   ├── extractNameEmail.ts
│   │   │   └── phoneExtractor.ts
│   │   └── server.ts              # Express app entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ResumeUpload.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── .github/
│   └── copilot-instructions.md
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Resume Upload
```
POST /api/resume/upload
Content-Type: multipart/form-data

Body:
  resume: <PDF file>

Response:
  {
    "_id": "...",
    "name": "...",
    "email": "...",
    "phone": "...",
    "skills": [...],
    "score": 80,
    "resumeLevel": "Mid",
    "education": [{degree: "...", year: "..."}],
    "skillGap": {matched: [...], missing: [...]}
  }
```

### Generate AI Summary
```
GET /api/resume/ai-summary/:resumeId

Response:
  {
    "message": "AI Summary generated successfully",
    "resume": {
      "summary": "Professional summary text (ATS-friendly, 2-3 lines)"
    }
  }
```

### Get Resume Summary
```
GET /api/resume/summary/:resumeId

Response:
  {
    "_id": "...",
    "name": "...",
    "skills": [...],
    "score": 80,
    "summary": "..."
  }
```

## 🛠️ Key Utilities

| Utility | Purpose |
|---------|---------|
| `resumeAnalyzer.ts` | Keyword-based skill detection with scoring |
| `resumeLevel.ts` | Experience level detection (Junior/Mid/Senior) |
| `educationExtractor.ts` | Extract degree and graduation year |
| `skillGapAnalyzer.ts` | Compare skills against job requirements |
| `phoneExtractor.ts` | Extract phone numbers from resume text |
| `extractNameEmail.ts` | Extract contact information |

## ⚙️ Configuration & Important Notes

### Critical Setup Requirements
1. **dotenv.config() First**: Must be called before any imports in `server.ts`
2. **Multer Middleware**: Uses memory storage for file uploads
3. **MongoDB**: Running on `mongodb://127.0.0.1:27017/ai_resume`
4. **Groq API Key**: Required in `.env` file

### Score Calculation
- Formula: `Math.min(100, skills.length * 10)`
- Simple linear model based on detected skills
- Range: 0-100

### Resume Level Detection
- **Junior**: Less than 2 years experience
- **Mid**: 2-5 years experience
- **Senior**: 5+ years experience

### LLM Configuration
- **Model**: `llama-3.1-8b-instant` (Groq)
- **Temperature**: 0.4 (controlled output)
- **Max Tokens**: 120 (concise summaries)
- **Output Format**: ATS-friendly, no first-person pronouns

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "MongoDB Connected" not appearing | Ensure MongoDB is running on localhost:27017 |
| PDF parsing fails | Check pdf-parse version (1.1.1); ensure buffer is passed, not file path |
| Missing skills detection | Review keyword list in `resumeAnalyzer.ts`; keywords are case-insensitive |
| GROQ API errors | Verify `.env` has valid GROQ_API_KEY; check Groq SDK version |
| CORS errors | CORS is enabled globally; check frontend makes requests to `http://localhost:5000` |

## 📝 Adding New Features

### Add a New Extraction Utility
1. Create new file in `backend/src/utils/`
2. Export extraction function
3. Import and use in `backend/src/controllers/resumeController.ts`

### Add a New API Endpoint
1. Create route handler or extend existing controller
2. Add route in `backend/src/routes/resumeRoutes.ts`
3. Handle errors with appropriate HTTP status codes (404, 400, 500)

### Extend Skill Keywords
Edit `backend/src/utils/resumeAnalyzer.ts` and add to `skillsKeywords` array.

## 🤝 Contributing

1. Follow existing code patterns and naming conventions
2. Test changes locally before committing
3. Update `.env` with necessary configuration
4. Check `README.md` for any project-specific requirements

## 📄 License

ISC

## 👤 Author

Anand Kumar Gautam

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Last Updated**: December 2025
