# Frontend Setup & Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

**Output**: `Local: http://localhost:5173`

### Step 4: Open in Browser
Visit `http://localhost:5173` - you should see the AI Resume Analyzer app!

## 📋 Prerequisites Check

Before starting, ensure:
- ✅ Node.js v16+ installed: `node --version`
- ✅ npm installed: `npm --version`
- ✅ Backend running on `http://localhost:5000`
- ✅ MongoDB running on `mongodb://127.0.0.1:27017`

## 🎯 Available Commands

```bash
# Development with hot reload
npm run dev

# Type check
npm run build  # This checks types too

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure at a Glance

```
frontend/src/
├── components/        → React components
├── services/          → API calls
├── types/             → TypeScript types
├── utils/             → Helper functions
├── hooks/             → Custom hooks
├── constants/         → App constants
├── context/           → Global state
└── App.tsx            → Main app
```

## ✨ Features You Can Try

### 1. Upload Resume
- Drag and drop a PDF
- Or click to browse and select
- File must be .pdf (max 10MB)

### 2. View Analysis
- See parsed contact info
- View detected skills
- Check experience level
- See resume score

### 3. Generate AI Summary
- Click "Generate Summary" button
- Get ATS-friendly 2-3 line summary
- Regenerate as needed

## 🐛 Troubleshooting

### "Cannot connect to localhost:5000"
**Solution**: Start the backend
```bash
cd backend
npm run dev
```

### "Module not found" errors
**Solution**: Install dependencies
```bash
npm install
```

### Port 5173 already in use
**Solution**: Use different port
```bash
npm run dev -- --port 5174
```

### Styles not loading
**Solution**: Clear cache
```bash
rm -rf node_modules/.vite
npm run dev
```

## 📱 Testing the App

### Happy Path (Success Scenario)
1. ✅ Open app in browser
2. ✅ Upload a PDF resume
3. ✅ View parsed data
4. ✅ Click "Generate Summary"
5. ✅ See AI-generated summary

### Error Scenarios
1. Upload non-PDF file → See error
2. Upload file > 10MB → See error
3. Disconnect backend → See error on next action

## 🎨 Customization

### Change API URL
Edit `services/api.ts`:
```tsx
const API_BASE_URL = 'http://localhost:5000/api';  // Change this
```

### Change Color Scheme
Edit `index.css`:
```css
:root {
  --primary-color: #YOUR_COLOR;
}
```

### Change UI Text
Edit `constants/index.ts`:
```tsx
export const MESSAGES = {
  // Add your messages here
}
```

## 📦 Production Deployment

### Build for Production
```bash
npm run build
```

Creates `dist/` folder with optimized build

### Deploy to Server
1. Run `npm run build`
2. Upload `dist/` folder to server
3. Configure server to serve `index.html` for all routes
4. Update API URL if backend is on different host

### Environment Variables (Optional)
Create `.env` file:
```
VITE_API_URL=https://api.example.com
```

Use in code:
```tsx
const API_BASE_URL = import.meta.env.VITE_API_URL;
```

## 🔍 Checking Everything Works

Run this checklist:

- [ ] App loads without errors
- [ ] Can upload a PDF file
- [ ] Resume data displays correctly
- [ ] Skills are detected
- [ ] Score is calculated
- [ ] Can generate AI summary
- [ ] Can regenerate summary
- [ ] Responsive on mobile view
- [ ] Error messages appear on failure
- [ ] Success messages appear on success

## 💡 Tips & Tricks

### View Network Requests
Open Browser DevTools → Network tab → Upload file → See API calls

### Debug State
Open Browser DevTools → Console → No errors should appear

### Test Responsive Design
- DevTools → Device Toolbar
- Test on iPhone 12, iPad, Desktop

### Check Performance
- DevTools → Lighthouse
- Run audit for Performance

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Cannot find module" | Missing dependencies | `npm install` |
| "Cannot connect to API" | Backend not running | `cd backend && npm run dev` |
| "Port 5173 in use" | Another app using port | Kill process or use `--port 5174` |
| "Styles not applied" | Tailwind not processing | Clear cache: `rm -rf .vite` |
| "API Error 404" | Wrong API URL | Check `API_BASE_URL` in api.ts |

## 📚 Documentation

- **README-FRONTEND.md** - Detailed frontend docs
- **IMPLEMENTATION.md** - Implementation details
- **README.md** - Project-wide docs (root)

## 🤝 Need Help?

Check these files in order:
1. This guide (SETUP.md)
2. README-FRONTEND.md
3. IMPLEMENTATION.md
4. Source code comments

---

**Status**: Ready to use  
**Last Updated**: December 2025
