interface AnalysisResult {
  skills: string[];
  score: number;
}

/**
 * Escape special regex characters
 * Fixes issues with skills like C++, C#, ASP.NET
 */
const escapeRegex = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const analyzeResume = (text: string): AnalysisResult => {
  // Comprehensive skills keywords list
  const skillsKeywords = [
    // Programming Languages
    "javascript", "typescript", "python", "java", "c++", "c#", "go", "rust", "php", "ruby",
    "swift", "kotlin", "scala", "haskell", "perl", "r", "matlab", "julia", "groovy", "clojure",

    // Frontend Frameworks & Libraries
    "react", "angular", "vue", "next", "nextjs", "svelte", "ember", "backbone", "jquery",
    "tailwind", "bootstrap", "material", "webpack", "vite", "gulp", "grunt",

    // Backend Frameworks
    "node", "nodejs", "express", "django", "flask", "fastapi", "spring", "springboot",
    "laravel", "rails", "asp.net", "aspnet", "nestjs", "fiber", "gin",

    // Databases
    "mongodb", "mysql", "postgresql", "postgres", "sql", "oracle", "redis",
    "elasticsearch", "cassandra", "dynamodb", "firebase", "firestore",
    "mariadb", "sqlite", "neo4j",

    // Cloud & DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "gitlab", "github",
    "circleci", "terraform", "ansible", "heroku", "netlify", "vercel",
    "ec2", "s3", "lambda",

    // Testing & QA
    "jest", "mocha", "cypress", "selenium", "junit", "pytest", "unittest",
    "postman", "rest", "api", "graphql",

    // Other Technologies
    "git", "linux", "html", "css", "scss", "sass", "less", "babel", "eslint",
    "json", "xml", "yaml", "regex", "agile", "scrum", "jira", "confluence",
    "figma", "adobe", "photoshop", "illustrator", "xd"
  ];

  const lowerText = text.toLowerCase();
  const foundSkills: { [key: string]: boolean } = {};

  skillsKeywords.forEach(skill => {
    const safeSkill = escapeRegex(skill);
    const regex = new RegExp(`\\b${safeSkill}\\b`, "gi");

    if (regex.test(lowerText)) {
      foundSkills[skill] = true;
    }
  });

  const skills = Object.keys(foundSkills);

  // Score calculation (old logic preserved)
  let score = 0;
  if (skills.length === 0) score = 10;
  else if (skills.length < 3) score = 20;
  else if (skills.length < 5) score = 40;
  else if (skills.length < 8) score = 60;
  else if (skills.length < 12) score = 80;
  else score = 100;

  console.log(`[ANALYSIS] Found ${skills.length} skills:`, skills);
  console.log(`[ANALYSIS] Score: ${score}`);

  return {
    skills,
    score
  };
};

export default analyzeResume;
