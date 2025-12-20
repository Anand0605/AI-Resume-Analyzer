interface AnalysisResult {
  skills: string[];
  score: number;
}

const analyzeResume = (text: string): AnalysisResult => {
  // Extract skills (simple keyword matching)
  const skillsKeywords = [
    "javascript", "typescript", "python", "react", "node", "express",
    "mongodb", "sql", "html", "css", "java", "c++", "aws", "docker",
    "git", "rest", "api", "angular", "vue", "nodejs"
  ];
  
  const lowerText = text.toLowerCase();
  const foundSkills: { [key: string]: boolean } = {};
  
  skillsKeywords.forEach(skill => {
    if (lowerText.includes(skill)) {
      foundSkills[skill] = true;
    }
  });
  
  const skills = Object.keys(foundSkills);
  
  // Calculate score based on skills found (0-100)
  const score = Math.min(100, skills.length * 10);
  
  return {
    skills,
    score
  };
};

export default analyzeResume;
