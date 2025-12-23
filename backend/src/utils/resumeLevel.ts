export function detectResumeLevel(text: string) {
  const lowerText = text.toLowerCase();
  
  // Check for years of experience
  const experienceMatch = text.match(/(\d+)\+?\s+years?/i);
  const years = experienceMatch ? parseInt(experienceMatch[1]) : 0;
  
  // Check for seniority keywords
  const seniorKeywords = /senior|lead|architect|principal|director|head|manager|staff/i;
  const juniorKeywords = /junior|entry|fresh|graduate|intern|trainee/i;
  const midKeywords = /mid[\s-]?level|intermediate|associate|specialist/i;
  
  // Keyword-based detection has priority
  if (seniorKeywords.test(text)) return "Senior";
  if (juniorKeywords.test(text)) return "Junior";
  if (midKeywords.test(text)) return "Mid-Level";
  
  // Fallback to years of experience
  if (years === 0) return "Fresher";
  if (years <= 2) return "Junior";
  if (years <= 5) return "Mid-Level";
  if (years <= 10) return "Senior";
  return "Expert";
}
