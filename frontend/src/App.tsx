import { useState } from "react";
import { ResumeUpload } from "./components/ResumeUpload";
import { ResumeDisplay } from "./components/ResumeDisplay";
import { SummarySection } from "./components/SummarySection";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";
import type { Resume, UploadResponse, ApiError } from "./types";
import "./App.css";

function App() {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUploadSuccess = (uploadedResume: UploadResponse) => {
    setCurrentResume({ ...uploadedResume, summary: "" });
    setSuccess("Resume uploaded and analyzed successfully!");
    setError(null);
  };

  const handleError = (err: ApiError) => {
    setError(err);
    setSuccess(null);
  };

  const handleSummarySuccess = (summary: string) => {
    if (!currentResume) return;
    setCurrentResume({ ...currentResume, summary });
  };

  const handleReset = () => {
    setCurrentResume(null);
    setError(null);
    setSuccess(null);
    setIsLoading(false);
  };

  const features = [
    {
      icon: "🔍",
      title: "Smart Analysis",
      desc: "Automatically extract skills, education, and contact information",
      tag: "AI Powered",
    },
    {
      icon: "⚙️",
      title: "Skill Detection",
      desc: "Identify technical skills and compare against job requirements",
      tag: "Smart Matching",
    },
    {
      icon: "✨",
      title: "AI Summaries",
      desc: "Generate professional ATS-friendly summaries instantly",
      tag: "Resume Boost",
    },
    {
      icon: "📊",
      title: "Experience Level",
      desc: "Detect your experience level and career positioning",
      tag: "Career Insight",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-blue-900 to-green-900 text-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📄</span>
            <div>
              <h1 className="text-2xl font-bold text-green-400">
                AI Resume Analyzer
              </h1>
              <p className="text-sm text-gray-300">
                Analyze, improve & optimize your resume
              </p>
            </div>
          </div>

          {currentResume && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium bg-green-400 text-black rounded-lg hover:bg-green-500 transition"
            >
              ← New Resume
            </button>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full flex flex-col">

        {error && <ErrorAlert error={error} onDismiss={() => setError(null)} />}
        {success && <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />}

        {!currentResume ? (
          <>
            {/* UPLOAD SECTION */}
       <section className="text-center mt-12 mb-16">
  <h2 className="text-4xl font-bold text-green-400">
    Upload Your Resume
  </h2>

  <p className="text-gray-300 text-lg mt-6">
    Get AI-powered resume analysis, skill detection & summaries
  </p>

  <div className="mt-8">
    <ResumeUpload
      onUploadSuccess={handleUploadSuccess}
      onError={handleError}
      isLoading={isLoading}
      onLoadingChange={setIsLoading}
    />
  </div>
</section>




            {/* FEATURES SECTION */}
            <section className="flex w-full justify-center bg-red-600 mt-16 py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
                {features.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#0b1220] to-[#020617] rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-[1.03] transition duration-300 space-y-4"
                  >
                    {/* ICON */}
                    <div className="text-4xl">{card.icon}</div>

                    {/* CONTENT */}
                    <div className="w-full px-3 text-center space-y-2">
                      <h3 className="text-lg font-bold text-green-400 break-words">
                        {card.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed break-words">
                        {card.desc}
                      </p>
                    </div>

                    {/* TAG */}
                    <div className="mt-auto pt-4 text-xs text-blue-400">{card.tag}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="space-y-12 mt-12">
            <ResumeDisplay resume={currentResume} />

            <SummarySection
              resumeId={currentResume._id}
              initialSummary={currentResume.summary}
              onError={handleError}
              onSuccess={handleSummarySuccess}
            />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-black/90 border-t border-gray-700 py-8 text-center text-gray-400">
        <p>AI Resume Analyzer • Powered by React & Groq</p>
        <p className="text-sm mt-1">© 2025 Anand Kumar Gautam</p>
      </footer>
    </div>
  );
}

export default App;
