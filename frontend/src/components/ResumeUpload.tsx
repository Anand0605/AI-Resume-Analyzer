import { useState } from "react";
import { uploadResume } from "../services/api";
import type { UploadResponse, ApiError } from "../types";

interface ResumeUploadProps {
  onUploadSuccess: (resume: UploadResponse) => void;
  onError: (error: ApiError) => void;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
}

export const ResumeUpload = ({
  onUploadSuccess,
  onError,
  isLoading,
  onLoadingChange,
}: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.includes("pdf")) {
      onError({ message: "Please upload a PDF file", status: 400 });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onError({ message: "File size must be less than 10MB", status: 400 });
      return;
    }

    onLoadingChange(true);
    try {
      const response = await uploadResume(file);
      onUploadSuccess(response);
    } catch (error) {
      onError(error as ApiError);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  return (
    <div className="w-full flex justify-center mt-12">
      {/* Upload Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative w-full max-w-2xl
          rounded-2xl
          p-12 md:p-14
          text-center border-2 border-dashed
          transition-all duration-300
          bg-gradient-to-br from-black via-slate-900 to-black
          ${
            dragActive
              ? "border-blue-500 shadow-[0_0_35px_rgba(59,130,246,0.6)]"
              : "border-slate-700 hover:border-green-400"
          }
          ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {/* Hidden Input */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleChange}
          disabled={isLoading}
          className="absolute inset-0 w-full h-full opacity-0"
        />

        <div className="pointer-events-none">
          {/* ICON - PERFECT CENTER */}
          
<div className="flex justify-center mb-4">
  <div className="flex h-20 w-20 items-center justify-center rounded-full
    bg-gradient-to-tr from-blue-600 to-green-500 shadow-xl">
    <svg
      className="h-10 w-10 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      />
    </svg>
  </div>
</div>


          {/* HEADING */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {isLoading ? "Uploading Resume..." : "Upload Your Resume"}
          </h2>

          {/* SUBTITLE */}
          <p className="text-slate-400 mb-6">
            Drag & drop your PDF resume or{" "}
            <span className="text-blue-400 font-semibold">
              browse from device
            </span>
          </p>

          {/* BADGES */}
          <div className="flex justify-center gap-3 text-sm">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400">
              PDF Only
            </span>
            <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400">
              Max 10MB
            </span>
            <span className="px-4 py-1.5 rounded-full bg-slate-700/50 text-slate-300">
              Secure Upload
            </span>
          </div>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="mt-8 flex justify-center">
            <svg
              className="h-10 w-10 animate-spin text-green-400"
              viewBox="0 0 24 24"
              fill="none"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
