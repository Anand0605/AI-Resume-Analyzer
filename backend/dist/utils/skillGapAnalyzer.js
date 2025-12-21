"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeSkillGap = analyzeSkillGap;
function analyzeSkillGap(resumeSkills, jobDescription) {
    const jdSkills = jobDescription
        .toLowerCase()
        .match(/\b(html|css|javascript|react|node|mongodb|express|sql|python|java)\b/g) || [];
    const uniqueJDSkills = [...new Set(jdSkills)];
    const missingSkills = uniqueJDSkills.filter(skill => !resumeSkills.map(s => s.toLowerCase()).includes(skill));
    return {
        requiredSkills: uniqueJDSkills,
        missingSkills,
        matchPercentage: uniqueJDSkills.length === 0
            ? 0
            : Math.round(((uniqueJDSkills.length - missingSkills.length) /
                uniqueJDSkills.length) *
                100)
    };
}
