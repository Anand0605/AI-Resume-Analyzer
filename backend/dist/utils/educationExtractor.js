"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEducation = extractEducation;
function extractEducation(text) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const degrees = [
        "btech", "b.tech", "be", "b.e",
        "bca", "mca", "mba",
        "bsc", "msc",
        "bachelor", "master",
        "intermediate", "12th", "10th"
    ];
    const education = [];
    for (let i = 0; i < lines.length; i++) {
        const lineLower = lines[i].toLowerCase();
        if (degrees.some(d => lineLower.includes(d))) {
            // search year in next 2 lines
            let year = null;
            for (let j = i; j <= i + 2 && j < lines.length; j++) {
                const match = lines[j].match(/\b(19|20)\d{2}\b/g);
                if (match) {
                    year = match.join(" - ");
                    break;
                }
            }
            education.push({
                degree: lines[i],
                year
            });
        }
    }
    return education;
}
