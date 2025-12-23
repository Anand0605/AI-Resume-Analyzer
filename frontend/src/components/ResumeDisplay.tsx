/**
 * ResumeDisplay Component
 * Shows parsed resume information
 */

import React from 'react';
import type { Resume } from '../types';

interface ResumeDisplayProps {
  resume: Resume;
}

export const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ resume }) => {
  const getScoreBadgeColor = (score: number): string => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getLevelBadgeColor = (level: string | undefined): string => {
    if (!level) return 'bg-gray-100 text-gray-800 border-gray-300';
    switch (level.toLowerCase()) {
      case 'senior':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'mid':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'junior':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {resume.name}
            </h2>
            <div className="space-y-1 text-gray-600">
              {resume.email && (
                <p className="flex items-center gap-2">
                  <span className="text-lg">✉️</span>
                  <a
                    href={`mailto:${resume.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {resume.email}
                  </a>
                </p>
              )}
              {resume.phone && (
                <p className="flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <a
                    href={`tel:${resume.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {resume.phone}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <div
              className={`
                px-4 py-2 rounded-full font-semibold border text-sm
                ${getScoreBadgeColor(resume.score)}
              `}
            >
              Score: {resume.score}/100
            </div>
            <div
              className={`
                px-4 py-2 rounded-full font-semibold border text-sm
                ${getLevelBadgeColor(resume.resumeLevel)}
              `}
            >
              {resume.resumeLevel || 'N/A'} Level
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-lg">⚙️</span>
          Technical Skills
        </h3>
        {resume.skills && resume.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills detected</p>
        )}
      </div>

      {/* Education Section */}
      {resume.education && resume.education.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-lg">🎓</span>
            Education
          </h3>
          <div className="space-y-3">
            {resume.education.map((edu, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-lg">📚</span>
                <div>
                  {edu.degree && (
                    <p className="font-semibold text-gray-800">{edu.degree}</p>
                  )}
                  {edu.year && (
                    <p className="text-sm text-gray-600">Graduated: {edu.year}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Gap Section */}
      {resume.skillGap && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            Skill Analysis
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            {resume.skillGap.matched && resume.skillGap.matched.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  Matched Skills ({resume.skillGap.matched.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skillGap.matched.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {resume.skillGap.missing && resume.skillGap.missing.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  Missing Skills ({resume.skillGap.missing.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skillGap.missing.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
