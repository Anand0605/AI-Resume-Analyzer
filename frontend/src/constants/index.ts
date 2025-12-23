/**
 * Application constants
 */

export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf'],
  ACCEPTED_EXTENSIONS: ['.pdf'],
};

export const RESUME_LEVELS = {
  JUNIOR: 'Junior',
  MID: 'Mid',
  SENIOR: 'Senior',
} as const;

export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  NEEDS_IMPROVEMENT: 0,
} as const;

export const MESSAGES = {
  SUCCESS: {
    UPLOAD: 'Resume uploaded and analyzed successfully!',
    SUMMARY: 'AI summary generated successfully!',
  },
  ERROR: {
    UPLOAD: 'Failed to upload resume. Please try again.',
    SUMMARY: 'Failed to generate summary. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    SERVER: 'Server error. Please try again later.',
  },
  VALIDATION: {
    INVALID_FILE_TYPE: 'Please upload a PDF file',
    FILE_TOO_LARGE: 'File size must be less than 10MB',
    FILE_REQUIRED: 'Resume file is required',
  },
} as const;

export const ANIMATION_DURATION = {
  SHORT: 300,
  MEDIUM: 500,
  LONG: 1000,
} as const;
