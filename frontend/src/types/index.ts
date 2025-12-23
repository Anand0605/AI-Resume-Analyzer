/**
 * Type definitions for Resume data structures
 */

export interface Education {
  degree?: string;
  year?: string;
}

export interface SkillGap {
  matched: string[];
  missing: string[];
}

export interface Resume {
  _id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  score: number;
  resumeLevel: string;
  education: Education[];
  summary: string;
  skillGap: SkillGap;
  createdAt?: string;
  updatedAt?: string;
}

export interface UploadResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  score: number;
  resumeLevel: string;
  education: Education[];
  skillGap: SkillGap;
}

export interface SummaryResponse {
  message: string;
  resume: {
    summary: string;
  };
}

export interface ApiError {
  message: string;
  status: number;
}
