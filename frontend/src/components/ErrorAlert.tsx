/**
 * ErrorAlert Component
 * Displays error messages to the user
 */

import React from 'react';
import type { ApiError } from '../types';

interface ErrorAlertProps {
  error: ApiError | null;
  onDismiss: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-in fade-in slide-in-from-top">
      <div className="flex items-start gap-3">
        <span className="text-2xl">❌</span>
        <div className="flex-1">
          <h4 className="font-semibold text-red-800 mb-1">Error</h4>
          <p className="text-red-700 text-sm">{error.message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 font-bold text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
