import { useState } from 'react';
import { ResumeUpload } from './components/ResumeUpload';
import { ResumeDisplay } from './components/ResumeDisplay';
import { SummarySection } from './components/SummarySection';
import { ErrorAlert } from './components/ErrorAlert';
import { SuccessAlert } from './components/SuccessAlert';
import type { Resume, UploadResponse, ApiError } from './types/index';
import './App.css';

function App() {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUploadSuccess = (uploadedResume: UploadResponse) => {
    const resumeData: Resume = {
      ...uploadedResume,
      summary: '',
    };
    setCurrentResume(resumeData);
    setSuccess('Resume uploaded and analyzed successfully!');
    setError(null);
  };

  const handleError = (err: ApiError) => {
    setError(err);
    setSuccess(null);
  };

  const handleSummarySuccess = (summary: string) => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        summary,
      });
    }
  };

  const handleReset = () => {
    setCurrentResume(null);
    setError(null);
    setSuccess(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-green-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📄</span>
            <div>
              <h1 className="text-2xl font-bold text-green-400">
                AI Resume Analyzer
              </h1>
              <p className="text-sm text-gray-300">
                Analyze, improve, and optimize your resume
              </p>
            </div>
          </div>
          {currentResume && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-black bg-green-400 hover:bg-green-500 rounded-lg transition-all"
            >
              ← New Resume
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Alerts */}
        {error && <ErrorAlert error={error} onDismiss={() => setError(null)} />}
        {success && <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />}

        {!currentResume ? (
          <div className="space-y-16">
            {/* Upload Section */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-green-400 mb-3">
                Upload Your Resume
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Get instant AI-powered analysis of your resume with skill detection,
                experience level assessment, and more.
              </p>

              <ResumeUpload
                onUploadSuccess={handleUploadSuccess}
                onError={handleError}
                isLoading={isLoading}
                onLoadingChange={setIsLoading}
              />
            </div>

            {/* Features Section - 4 Cards Centered */}
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
                <div className="bg-gray-900/80 rounded-xl shadow-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3 text-blue-400">🔍</div>
                  <h3 className="font-bold text-xl text-green-400 mb-2">Smart Analysis</h3>
                  <p className="text-gray-300 text-sm">
                    Automatically extract skills, education, and contact information
                  </p>
                </div>

                <div className="bg-gray-900/80 rounded-xl shadow-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3 text-blue-400">⚙️</div>
                  <h3 className="font-bold text-xl text-green-400 mb-2">Skill Detection</h3>
                  <p className="text-gray-300 text-sm">
                    Identify technical skills and compare against job requirements
                  </p>
                </div>

                <div className="bg-gray-900/80 rounded-xl shadow-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3 text-blue-400">✨</div>
                  <h3 className="font-bold text-xl text-green-400 mb-2">AI Summaries</h3>
                  <p className="text-gray-300 text-sm">
                    Generate professional ATS-friendly summaries instantly
                  </p>
                </div>

                <div className="bg-gray-900/80 rounded-xl shadow-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3 text-blue-400">📊</div>
                  <h3 className="font-bold text-xl text-green-400 mb-2">Experience Level</h3>
                  <p className="text-gray-300 text-sm">
                    Detect your experience level and career positioning
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Results Section */}
            <ResumeDisplay resume={currentResume} />

            {/* Summary Section */}
            <SummarySection
              resumeId={currentResume._id}
              initialSummary={currentResume.summary}
              onError={handleError}
              onSuccess={handleSummarySuccess}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/90 text-gray-400 py-8 border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mb-2">
            AI Resume Analyzer - Powered by Groq & React
          </p>
          <p className="text-sm">
            © 2025 Anand Kumar Gautam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
