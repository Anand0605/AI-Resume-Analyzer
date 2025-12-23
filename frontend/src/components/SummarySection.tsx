/**
 * SummarySection Component
 * Displays AI-generated summary and handles summary generation
 */

import React, { useState, useEffect } from 'react';
import { generateAISummary } from '../services/api';
import type { ApiError } from '../types';

interface SummarySectionProps {
  resumeId: string;
  initialSummary?: string;
  onError: (error: ApiError) => void;
  onSuccess?: (summary: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  resumeId,
  initialSummary,
  onError,
  onSuccess,
}) => {
  const [summary, setSummary] = useState<string>(initialSummary || '');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(!!initialSummary);

  useEffect(() => {
    if (initialSummary) {
      setSummary(initialSummary);
    }
  }, [initialSummary]);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    console.log('[SummarySection] Generating summary for resumeId:', resumeId);

    try {
      const response = await generateAISummary(resumeId);
      console.log('[SummarySection] Response received:', response);
      
      if (response?.resume?.summary) {
        setSummary(response.resume.summary);
        setHasGenerated(true);
        onSuccess?.(response.resume.summary);
        console.log('[SummarySection] Summary set successfully');
      } else {
        console.error('[SummarySection] No summary in response:', response);
        onError({
          message: 'No summary returned from server',
          status: 500,
        });
      }
    } catch (error) {
      console.error('[SummarySection] Error generating summary:', error);
      onError(error as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-lg">✨</span>
          AI-Generated Summary
        </h3>
      </div>

      {summary ? (
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 mb-4">
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
          <p className="text-gray-500 italic">
            No summary generated yet. Click the button below to generate a professional ATS-friendly summary.
          </p>
        </div>
      )}

      <button
        onClick={handleGenerateSummary}
        disabled={isLoading}
        className={`
          w-full md:w-auto px-6 py-2 rounded-lg font-semibold
          transition-colors duration-200 flex items-center justify-center gap-2
          ${isLoading
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </>
        ) : (
          <>
            <span>✨ Gen</span>
            {hasGenerated ? 'Regenerate Summary' : 'Generate Summary'}
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 mt-3">
        💡 Summaries are ATS-friendly and optimized for applicant tracking systems.
      </p>
    </div>
  );
};
