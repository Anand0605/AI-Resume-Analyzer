"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEducation = extractEducation;
function extractEducation(text) {
    const degrees = [
        "B\\.Tech", "B\\.E", "BCA", "MCA",
        "M\\.Tech", "MBA", "BSc", "MSc",
        "Bachelor", "Master", "Diploma",
        "Intermediate", "12th", "10th"
    ];
    const regex = new RegExp(`(${degrees.join("|")})[^\\n]*`, "gi");
    const matches = text.match(regex) || [];
    return matches.map(line => {
        const year = line.match(/\b(19|20)\d{2}\b/);
        return {
            degree: line.trim(),
            year: year ? year[0] : null
        };
    });
}
