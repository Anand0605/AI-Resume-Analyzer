/**
 * Global application context for state management
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Resume, ApiError } from '../types';

interface AppContextType {
  currentResume: Resume | null;
  setCurrentResume: (resume: Resume | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: ApiError | null;
  setError: (error: ApiError | null) => void;
  success: string | null;
  setSuccess: (message: string | null) => void;
  clearError: () => void;
  clearSuccess: () => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);
  const clearSuccess = useCallback(() => setSuccess(null), []);

  const resetAll = useCallback(() => {
    setCurrentResume(null);
    setError(null);
    setSuccess(null);
    setIsLoading(false);
  }, []);

  const value: AppContextType = {
    currentResume,
    setCurrentResume,
    isLoading,
    setIsLoading,
    error,
    setError,
    success,
    setSuccess,
    clearError,
    clearSuccess,
    resetAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
