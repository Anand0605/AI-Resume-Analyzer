



/**
 * API client for backend communication
 */

import type { UploadResponse, SummaryResponse, ApiError } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Handle API errors
 */
const handleError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: "An unknown error occurred",
    status: 500,
  };
};

/**
 * Upload a resume PDF file
 */
export const uploadResume = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    console.log("[API] Uploading resume:", file.name);
    const response = await fetch(`${API_BASE_URL}/resume/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to upload resume");
    }

    const result = await response.json();
    console.log("[API] Upload successful");

    // Backend returns { success, data }
    return result.data;
  } catch (error) {
    console.error("[API] Upload error:", error);
    throw handleError(error);
  }
};

/**
 * Generate AI summary for resume
 */
export const generateAISummary = async (
  resumeId: string
): Promise<SummaryResponse> => {
  try {
    console.log("[API] Generating AI summary for:", resumeId);

    const response = await fetch(
      `${API_BASE_URL}/resume/ai-summary/${resumeId}`
    );

    if (!response.ok) {
      console.error("[API] Response not ok:", response.status);
      throw new Error("Failed to generate AI summary");
    }

    const data: SummaryResponse = await response.json();
    console.log("[API] AI Summary generated:", data);

    return data;
  } catch (error) {
    console.error("[API] AI Summary error:", error);
    throw handleError(error);
  }
};
