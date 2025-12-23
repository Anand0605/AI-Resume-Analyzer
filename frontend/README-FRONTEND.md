# Frontend - AI Resume Analyzer

A modern, scalable React application for resume analysis with AI-powered summaries and skill detection.

## 📁 Project Structure

```
src/
├── components/              # Reusable React components
│   ├── ResumeUpload.tsx      # File upload component with drag-drop
│   ├── ResumeDisplay.tsx     # Display parsed resume data
│   ├── SummarySection.tsx    # AI summary generation
│   ├── ErrorAlert.tsx        # Error notification component
│   ├── SuccessAlert.tsx      # Success notification component
│   └── LoadingSpinner.tsx    # Loading state component
├── services/                # API communication
│   └── api.ts               # Backend API client
├── types/                   # TypeScript type definitions
│   └── index.ts             # Resume, Response, Error types
├── utils/                   # Utility functions
│   └── index.ts             # Helpers for validation, formatting
├── hooks/                   # Custom React hooks
│   └── index.ts             # useAsync, useLocalStorage hooks
├── constants/               # Application constants
│   └── index.ts             # API config, messages, thresholds
├── context/                 # React Context for state management
│   └── AppContext.tsx       # Global app state
├── assets/                  # Static assets
├── App.tsx                  # Main app component
├── App.css                  # App-specific styles
├── index.css                # Global styles + Tailwind
└── main.tsx                 # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend running on `http://localhost:5000`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts Vite dev server with HMR on `http://localhost:5173`

### Build

```bash
npm run build
```

Compiles TypeScript and bundles with Vite

### Linting

```bash
npm run lint
```

Check code quality with ESLint

### Preview

```bash
npm run preview
```

Preview production build locally

## 🏗️ Architecture & Patterns

### Component Structure

Components follow a clear pattern:
- **Props-based**: All components accept configuration via props
- **Error handling**: Errors passed to parent via callbacks
- **Type-safe**: Full TypeScript support with interface props

Example:
```tsx
interface ComponentProps {
  data: DataType;
  onSuccess: (result: Result) => void;
  onError: (error: ApiError) => void;
  isLoading: boolean;
}

export const Component: React.FC<ComponentProps> = ({ ... }) => {
  // Implementation
};
```

### API Integration

The `services/api.ts` file handles all backend communication:

```tsx
import { uploadResume, generateAISummary } from './services/api';

// Usage in components
const response = await uploadResume(file);
```

**Benefits**:
- Centralized API logic
- Consistent error handling
- Easy to mock for testing
- Type-safe requests/responses

### State Management

Two levels of state:

1. **Local State**: Individual component state for UI
2. **Global State**: `AppContext` for shared resume data

```tsx
import { useAppContext } from './context/AppContext';

const Component = () => {
  const { currentResume, setCurrentResume } = useAppContext();
  // Use global state
};
```

### Custom Hooks

Reusable logic in `hooks/index.ts`:

- `useAsync()`: Handle async operations with loading/error states
- `useLocalStorage()`: Persist state to localStorage

### Type Safety

All types defined in `types/index.ts`:

```tsx
interface Resume {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  score: number;
  // ...
}
```

## 🎨 Styling

### Tailwind CSS

Uses Tailwind CSS 4.x for styling:

```tsx
<div className="bg-blue-100 text-blue-800 rounded-lg p-4 hover:bg-blue-200">
  Content
</div>
```

**Key files**:
- `index.css`: Global styles + Tailwind import
- `App.css`: App-specific styles (minimal)

### Responsive Design

Mobile-first approach with Tailwind breakpoints:

```tsx
<div className="grid md:grid-cols-2 gap-4">
  {/* Mobile: 1 column, Tablet+: 2 columns */}
</div>
```

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19.2.0 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.2.4 | Build tool & dev server |
| Tailwind CSS | 4.1.18 | Utility-first CSS |

## 🔌 API Integration

### Endpoints Used

```
POST /api/resume/upload
GET /api/resume/summary/:resumeId
GET /api/resume/ai-summary/:resumeId
```

### Error Handling

All API errors caught and passed to components:

```tsx
try {
  const response = await uploadResume(file);
} catch (error) {
  onError(error as ApiError);
}
```

## 🧪 Testing Checklist

- [ ] Upload PDF file via drag-drop
- [ ] Upload PDF file via click
- [ ] Display parsed resume data
- [ ] Generate AI summary
- [ ] Regenerate summary
- [ ] Handle upload errors
- [ ] Handle network errors
- [ ] Responsive on mobile/tablet

## 📋 Component Reference

### ResumeUpload
- File validation (PDF, 10MB max)
- Drag-and-drop support
- Loading state
- Error handling

### ResumeDisplay
- Contact information
- Skills list
- Education section
- Skill gap analysis
- Score badges

### SummarySection
- Display AI summary
- Generate summary button
- Loading state
- Regenerate capability

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| API calls failing | Check backend is running on localhost:5000 |
| Styles not applying | Verify Tailwind CSS import in index.css |
| CORS errors | Backend CORS is enabled for localhost:3000+ |
| File upload fails | Check file size < 10MB and is PDF |

## 📚 Best Practices

1. **Component Composition**: Break large components into smaller, reusable pieces
2. **Error Handling**: Always handle and display errors to users
3. **Loading States**: Show loading indicators during async operations
4. **Type Safety**: Use TypeScript interfaces for all data
5. **Responsive Design**: Test on mobile, tablet, and desktop
6. **Accessibility**: Use semantic HTML and ARIA labels
7. **Performance**: Memoize expensive components with `React.memo()`

## 🚀 Performance Tips

1. Use `React.lazy()` for code splitting
2. Memoize expensive calculations
3. Use `useCallback()` for callback functions
4. Optimize images and assets
5. Monitor bundle size with `npm run build`

## 📖 Further Reading

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated**: December 2025
