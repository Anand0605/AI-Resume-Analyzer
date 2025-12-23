/**
 * SuccessAlert Component
 * Displays success messages to the user
 */

import React from 'react';

interface SuccessAlertProps {
  message: string;
  onDismiss: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  message,
  onDismiss,
  autoClose = true,
  autoCloseDelay = 4000,
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onDismiss, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onDismiss]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-in fade-in slide-in-from-top">
      <div className="flex items-start gap-3">
        <span className="text-2xl">✅</span>
        <div className="flex-1">
          <p className="text-green-700 text-sm">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-green-600 hover:text-green-800 font-bold text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
