"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractName = exports.extractEmail = void 0;
const extractEmail = (text) => {
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : "Unknown";
};
exports.extractEmail = extractEmail;
const extractName = (text) => {
    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);
    for (let i = 0; i < Math.min(10, lines.length); i++) {
        const line = lines[i];
        // ❌ skip junk lines
        if (/resume|curriculum|email|phone|mobile|address|linkedin|github|objective|summary/i.test(line)) {
            continue;
        }
        // ✅ CASE 1: ALL CAPS NAME
        if (/^[A-Z\s]{4,40}$/.test(line)) {
            return line
                .toLowerCase()
                .replace(/\b\w/g, c => c.toUpperCase());
        }
        // ✅ CASE 2: Normal capitalized name
        if (/^[A-Z][a-z]+(\s[A-Z][a-z\.]+){1,3}$/.test(line)) {
            return line.replace(/\s+/g, " ");
        }
    }
    return "Unknown";
};
exports.extractName = extractName;
