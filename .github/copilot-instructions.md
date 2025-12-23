# AI Resume Analyzer - Copilot Instructions

## Project Overview
Full-stack resume analysis platform with PDF extraction, AI-powered summaries, and skill gap analysis.
- **Backend**: Express.js + TypeScript, PDF parsing, MongoDB, Groq LLM integration
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Key Features**: Resume parsing, ATS-friendly summary generation, skill matching, resume level detection

## Critical Architecture Patterns

### Backend Data Flow
1. **PDF Upload** → `POST /api/resume/upload` (multer memory storage)
2. **Parsing** → pdf-parse extracts text; regex extracts name/email/phone
3. **Analysis** → Multiple utils extract skills, education, experience level
4. **Storage** → MongoDB Resume model saves structured data
5. **AI Generation** → Groq LLM generates summaries on-demand via dedicated controllers

### Important Constraints
- **❌ DO NOT** add `express.json()` before multer routes—breaks file uploads
- **✅ Use** `multer.memoryStorage()` for resume uploads (see [resumeRoutes.ts](backend/src/routes/resumeRoutes.ts))
- **⭐ MUST** call `dotenv.config()` FIRST in [server.ts](backend/src/server.ts) before imports
- **API Key**: GROQ_API_KEY must be set in `.env`; used for generating summaries with `llama-3.1-8b-instant` model

### Database Schema (MongoDB)
Resume model contains:
- Contact: `name`, `email`, `phone`
- Analysis: `skills` (array), `score` (0-100), `resumeLevel` (detected level)
- AI Content: `summary` (generated via Groq), `skillGap` (matched/missing arrays)
- Education: nested array with degree/year

### LLM Integration
- **Config**: [backend/src/config/groq.ts](backend/src/config/groq.ts)
- **Usage Pattern**: Resume data → Groq prompt → ATS-friendly summary (2-3 lines, no first-person)
- **Constraints**: Temperature 0.4, max_tokens 120 for controlled output
- See [aiSummaryController.ts](backend/src/controllers/aiSummaryController.ts) for prompt engineering approach

## Key Utilities & Extraction Logic

| Utility | Purpose | Input | Output |
|---------|---------|-------|--------|
| [resumeAnalyzer.ts](backend/src/utils/resumeAnalyzer.ts) | Keyword-based skill detection | PDF text | `{skills[], score}` |
| [resumeLevel.ts](backend/src/utils/resumeLevel.ts) | Experience level detection | PDF text | "Junior" / "Mid" / "Senior" |
| [educationExtractor.ts](backend/src/utils/educationExtractor.ts) | Degree/year extraction | PDF text | `{degree, year}[]` |
| [skillGapAnalyzer.ts](backend/src/utils/skillGapAnalyzer.ts) | Match against job requirements | `{skills, requirements}` | `{matched[], missing[]}` |

**Pattern**: All extractors use regex/keyword matching; extend in [backend/src/utils/](backend/src/utils/) for new extraction types.

## Development Workflows

### Backend
```bash
cd backend
npm run dev              # ts-node-dev hot-reload on localhost:5000
npm run build           # TypeScript compilation to dist/
npm start               # Run compiled JS
```
- **Testing Route**: `GET /test` returns "Server is running"
- **MongoDB**: Must be running locally on `mongodb://127.0.0.1:27017/ai_resume`

### Frontend
```bash
cd frontend
npm run dev             # Vite dev server with HMR
npm run build           # tsc + vite build
npm run lint            # ESLint check
npm run preview         # Preview production build
```

## Project-Specific Conventions

1. **Error Handling**: Controllers return 404 for missing resources, 400 for invalid input (see [aiSummaryController.ts](backend/src/controllers/aiSummaryController.ts))
2. **CORS**: Enabled globally at server level for frontend integration
3. **Skill Keywords**: Hardcoded list in [resumeAnalyzer.ts](backend/src/utils/resumeAnalyzer.ts)—extend when adding support for new tech stacks
4. **Score Calculation**: `Math.min(100, skills.length * 10)`—simple linear model
5. **Naming**: Controllers end in `Controller.ts`; utilities in utils folder; routes use plural `/api/resume` with resource ID endpoints

## Integration Points

- **Frontend ↔ Backend**: REST API at `/api/resume/*` (upload POST, summary GET)
- **Backend ↔ MongoDB**: Mongoose models; no migrations—schema evolution via schema updates
- **Backend ↔ Groq**: LLM calls in controllers; stateless, single model (`llama-3.1-8b-instant`)
- **Frontend ↔ Vite**: HMR enabled; CSS imports (Tailwind via `index.css`)

## Common Tasks

- **Add new extraction utility**: Create in [backend/src/utils/](backend/src/utils/), export function, import in [resumeController.ts](backend/src/controllers/resumeController.ts)
- **Add API endpoint**: Add route in [resumeRoutes.ts](backend/src/routes/resumeRoutes.ts), create/extend controller in [controllers/](backend/src/controllers/)
- **Modify Resume schema**: Update [Resume.ts](backend/src/models/Resume.ts), regenerate if using migrations
- **Adjust AI output**: Modify prompt in controller or temperature/max_tokens in Groq call
- **Update frontend UI**: Edit/create components in [frontend/src/components/](frontend/src/components/), import in App.tsx

## Debugging Notes

- Check MongoDB connection: Look for "MongoDB Connected" in console
- PDF parsing fails: Verify `pdf-parse` version (1.1.1); ensure buffer is passed not file path
- Missing skills: Review keyword list in [resumeAnalyzer.ts](backend/src/utils/resumeAnalyzer.ts)—case-insensitive regex
- GROQ API errors: Verify `.env` has valid GROQ_API_KEY; check Groq SDK version in package.json
