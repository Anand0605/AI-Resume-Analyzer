export function detectResumeLevel(text: string) {
  const experienceMatch = text.match(/(\d+)\+?\s+years?/i);
  const years = experienceMatch ? parseInt(experienceMatch[1]) : 0;

  if (years === 0) return "Fresher";
  if (years <= 2) return "Junior";
  if (years <= 5) return "Mid-Level";
  return "Senior";
}
